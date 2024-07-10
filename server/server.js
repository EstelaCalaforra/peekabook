import express from 'express';
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());

app.get("/api", (req, res) => {
    res.json({"books": ["The Count of Montecristo", "Jane Eyre", "Pride and Prejuice"]}); //our backend API that will
    //be fetched from the frontend
})

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});