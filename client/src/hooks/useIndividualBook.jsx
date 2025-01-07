import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBookshelf } from './useBookshelf'
import { useBook } from './useBook'
import { useAuth } from '../context/AuthContext'
import { BookSearchContext } from '../context/bookSearchContext'

export function useIndividualBook () {
  const { setBookId, setCategories } = useContext(BookSearchContext)
  const { isAuthenticated, userId, authToken } = useAuth()
  const { bookshelfData = [], setBookshelfData } = useBookshelf()
  const { book } = useBook()
  const [isInBookshelf, setIsInBookshelf] = useState(false)
  const navigate = useNavigate()

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const openPopup = () => setIsPopupOpen(true)
  const closePopup = () => setIsPopupOpen(false)
  const [categoriesSelected, setCategoriesSelected] = useState([])
  const [newCategory, setNewCategory] = useState('')
  const [review, setReview] = useState('')

  async function handleClick (idApi) {
    setBookId(idApi)
    navigate(`/ind-book/${idApi}`, { state: idApi })
  }

  async function handleAdd (event, id) {
    event.preventDefault()
    console.log({ id })

    if (categoriesSelected.length === 0) {
      // Delete book if no categories selected
      await fetch(`http://localhost:5000/api/books/remove/${userId}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      setBookshelfData(bookshelfData.filter(item => item.id_api !== id))
      setIsInBookshelf(false)
    } else {
      const bookData = {
        id: id,
        title: book.title,
        rating: 0,
        reviewText: review || '',
        categories: categoriesSelected,
        readDate: new Date()
      }

      const method = isInBookshelf ? 'PUT' : 'POST'
      const url = isInBookshelf
        ? `http://localhost:5000/api/books/update-bookshelf/${userId}`
        : 'http://localhost:5000/api/books/add'
      const bodyKey = isInBookshelf ? 'bookUpdated' : 'bookAdded'
      console.log({ bookData })
      const requestBody = {
        userId,
        [bodyKey]: bookData
      }

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify(requestBody)
        })

        if (response.ok) {
          const updatedBookshelfData = await response.json()
          setBookshelfData(updatedBookshelfData)
          setIsInBookshelf(categoriesSelected.length > 0)
        } else {
          console.error('Failed to update bookshelf:', await response.json())
        }
      } catch (error) {
        console.error('Error updating bookshelf:', error)
      }
    }

    closePopup()
  }
  
  function handleChangeCategoriesSelected (event) {
    const { value, checked } = event.target
    if (checked) {
      setCategoriesSelected([...categoriesSelected, value])
    } else {
      setCategoriesSelected(categoriesSelected.filter(option => option !== value))
    }
  }

  function handleChangeNewCategory (event) {
    const { value } = event.target
    setNewCategory(value)
  }

  function handleAddNewCategory (event) {
    event.preventDefault()
    setCategories((prevCategories) => ([...prevCategories, newCategory]))
    setNewCategory('')
  }

  async function handleClickAddToShelves(id) {
    
    if (isAuthenticated) {
      openPopup()
      const currentBook = await bookshelfData.find(item => item.id_api === id)
      console.log({ book })
      console.log({ currentBook })
      console.log({bookshelfData })
      setCategoriesSelected(currentBook?.categories || [])
    } else {
      navigate('/login')
    }
  }

  function handleReviewChange (event) {
    const { value } = event.target
    setReview(value)
  }

  return {
    handleClick,
    handleAdd,
    handleChangeCategoriesSelected,
    handleChangeNewCategory,
    handleAddNewCategory,
    handleClickAddToShelves,
    handleReviewChange,
    isPopupOpen,
    openPopup,
    closePopup,
    categoriesSelected,
    newCategory,
    review,
    isInBookshelf,
    setIsInBookshelf
  }
}
