import {
  findBookByIdApi,
  addUserBookRelation,
  insertBook,
  insertAuthor,
  getExistingAuthor,
  insertBookAuthorRelation,
  insertReview,
  getReviewsByBookId
} from '../models/bookModel.js'

export const addBookToUser = async (req, res) => {
  const { userId, bookAdded } = req.body
  console.log({ bookAdded })
  console.log({ userId })

  try {
    const book = await findBookByIdApi(bookAdded.id)

    const bookId = book?.id

    if (!bookId) {
      return res.status(500).json({ success: false, message: 'Book not found in database.' })
    }

    await addUserBookRelation(userId, bookId, bookAdded.readDate, bookAdded.categories)
    console.log(`Relationship inserted between book ID ${bookId} and user ID ${userId}`)

    if (bookAdded.reviewText || bookAdded.rating) {
      await insertReview(userId, bookId, bookAdded.reviewText, bookAdded.rating)
      console.log(`Review inserted for book ID ${bookId} and user ID ${userId}`)
    }

    res.status(200).json({ success: true, message: 'Book successfully added.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const addBooksIfNotOnDB = async (req, res) => {
  const { bookSearch } = req.body
  const books = bookSearch.map(book => ({
    id: book.id,
    title: book.volumeInfo?.title,
    authors: book.volumeInfo?.authors || [],
    description: book.volumeInfo?.description,
    cover: book.volumeInfo?.imageLinks?.smallThumbnail
  }))

  try {
    for (const book of books) {
      const bookId = await insertBook(book)
      if (!bookId) {
        console.log(`The book with id_api ${book.id} already exists.`)
      } else {
        console.log(`Book inserted with ID: ${bookId}`)
      }

      for (const authorName of book.authors) {
        let authorId = await insertAuthor(authorName)
        if (!authorId) {
          authorId = await getExistingAuthor(authorName)
        }
        await insertBookAuthorRelation(bookId, authorId)
      }
    }
    res.status(200).send('Books and authors inserted successfully')
  } catch (error) {
    console.error('Error inserting books and authors:', error)
    res.status(500).send('Error inserting books and authors')
  }
}

export const getReviews = async (req, res) => {
  const { userId, bookAdded } = req.body
  console.log({ bookAdded })
  console.log({ userId })
  const bookId = bookAdded.id
  console.log({ bookId })
  try {
    const reviews = await getReviewsByBookId(bookId)
    res.status(201).json({
      success: true,
      message: 'Reviews fetched successfully',
      reviews
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    res.status(500).send('Error fetching reviews.')
  }
}
