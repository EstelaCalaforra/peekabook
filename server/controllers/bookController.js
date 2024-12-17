import {
  findBookByIdApi,
  addUserBookRelation,
  insertBook,
  insertAuthor,
  getExistingAuthor,
  insertBookAuthorRelation,
  insertReview,
  getBookshelfByUserId,
  getBookDetailsByIdApi,
  updateUserBookRelation,
  deleteUserBookRelation
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
      const existingBook = await findBookByIdApi(book.id)
      if (existingBook) {
        console.log(`The book with id_api ${book.id} already exists.`)
        continue
      }

      const bookId = await insertBook(book)
      console.log(`Book inserted with ID: ${bookId}`)

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

export const getBookFromDB = async (req, res) => {
  const idApi = req.params.id
  console.log({ idApi })

  try {
    const book = await getBookDetailsByIdApi(idApi)
    console.log(book)
    res.status(200).json(book)
  } catch (error) {
    console.error('Error fetching book details:', error)
    res.status(500).json({ error: 'An error occurred while fetching book details.' })
  }
}

export const getUserBookshelf = async (req, res) => {
  const userId = req.params.id
  console.log({ userId })

  try {
    const books = await getBookshelfByUserId(userId)
    console.log(books)
    res.status(200).json(books)
  } catch (error) {
    console.error('Error fetching bookshelf data:', error)
    res.status(500).json({ error: 'An error occurred while fetching bookshelf data.' })
  }
}

export const updateUserBookshelf = async (req, res) => {
  const { userId } = req.params
  const { bookUpdated } = req.body
  console.log({ userId, bookUpdated })

  try {
    const book = await findBookByIdApi(bookUpdated.id)
    const bookId = book?.id
    if (!bookId) {
      return res.status(500).json({ success: false, message: 'Book not found in database.' })
    }

    // Llamar a la función que maneja la lógica de actualización en el modelo
    await updateUserBookRelation(
      userId,
      bookId,
      bookUpdated.readDate,
      bookUpdated.categories,
      bookUpdated.reviewText,
      bookUpdated.rating
    )

    res.status(200).json({ success: true, message: 'Bookshelf successfully updated.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const deleteBookFromUserBookshelf = async (req, res) => {
  const { userId, bookId } = req.params

  try {
    // Eliminar la relación entre el libro y el usuario
    const deletedBookId = await deleteUserBookRelation(userId, bookId)

    if (!deletedBookId) {
      return res.status(404).json({ success: false, message: 'Book not found in user bookshelf.' })
    }

    res.status(200).json({ success: true, message: 'Book successfully removed from bookshelf.' })
  } catch (error) {
    console.error('Error removing book from bookshelf:', error)
    res.status(500).json({ success: false, message: 'An error occurred while removing the book.' })
  }
}
