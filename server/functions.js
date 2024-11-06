// get bestseller books from NYTimes API
import axios from 'axios'

// get book covers from Google API
export async function getBookCover (books, db) {
  const API_URL = 'https://www.googleapis.com'
  let imgPath = ''

  books.forEach(async book => {
    if (book.img_path === null) {
      try {
        const response = await axios.get(API_URL + '/books/v1/volumes', {
          params: {
            q: book.title + '+inauthor:' + book.author // book.name at homeDB
          }
        })
        imgPath = response.data.items[0].volumeInfo.imageLinks.smallThumbnail
        try {
          await db.query('UPDATE book SET img_path=$1 WHERE id=$2', [imgPath, book.id])
        } catch (err) {
          console.log(err)
        }
      } catch (error) {
        console.error(error)
      }
    }
  })
}
