import express from 'express';
import cors from "cors";
import pg from 'pg';
import bodyParser from "body-parser";
import axios from 'axios';
// import { getBooks, getBookCover } from "./functions.js";

//important consts
const app = express();
const port = 5000;

// database
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "booklist",
    // password: "estelacodes",
    password: "administrador",
    port: 5432,
});
db.connect();

//middleware
app.use(cors());
app.use(bodyParser.json());

//get books
let order_by = "recency";
async function getBooks(order_by) {
    try {
        // let selectQuery = "SELECT book.id, title, name, rating, review, img_path FROM book INNER JOIN author ON book.id = author.id INNER JOIN review ON book.id = review.id"
        // // en realidad se puede mejorar metiendolo directamente en la linea de arriba
        // if (order_by === "rating") {
        //   selectQuery = selectQuery + " ORDER BY rating";
        // }
        let selectQuery = "SELECT id, title, author, rating, review, img_path FROM book"
        const result = await db.query(selectQuery);
        const books = result.rows;
        return books;
      } catch(err) {
        console.log(err);
      }
}
//get quote
async function getQuote() {
    try {   
        const response = await axios.get("https://recite.onrender.com/random/quote-from-db");
        const quote = response.data;
        return quote;
      } catch (error) {
        console.log(error);
      }
}

app.get("/get-random-quote", async (req, res) => {
    const quoteData = await getQuote();
    res.json(quoteData);
})

app.get("/api", async (req, res) => {
    const bookData = await getBooks(order_by);
    // console.log(bookData);
    res.json(bookData); //our backend API that will
    //be fetched from the frontend
})

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});