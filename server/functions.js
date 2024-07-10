async function getBookCover(books) {
    const API_URL = "https://www.googleapis.com";
    let img_path = "";

    books.forEach(async book => {
        if (book.img_path === null) {
            try {
                console.log("entrado");
                const response = await axios.get(API_URL + "/books/v1/volumes", {
                    params: {
                      q: book.title + "+inauthor:" + book.name,
                    }});
                    // console.log(response);
                    console.log(response.data.items[0].volumeInfo);
                    img_path = response.data.items[0].volumeInfo.imageLinks.smallThumbnail;
                    console.log(img_path);
                    try {
                        await db.query("UPDATE book SET img_path=$1 WHERE id=$2", [img_path, book.id]);
                      } catch(err) {
                        console.log(err);
                      }
              } catch (error) {
                console.error(error);
              }
        }
    });
}

async function getBooks(order_by) {
    try {
        let selectQuery = "SELECT book.id, title, name, rating, review, img_path FROM book INNER JOIN author ON book.id = author.id INNER JOIN review ON book.id = review.id"
        // en realidad se puede mejorar metiendolo directamente en la linea de arriba
        if (order_by === "rating") {
          selectQuery = selectQuery + " ORDER BY rating";
        }
        const result = await db.query(selectQuery);
        const books = result.rows;
        console.log(books);
        return books;
      } catch(err) {
        console.log(err);
      }
}

export { getBooks, getBookCover };