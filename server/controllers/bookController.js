import { findBookByIdApi, addUserBookRelation } from '../models/bookModel.js'

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
    res.status(200).json({ success: true, message: 'Book successfully added.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
