import { useContext, useId } from 'react'
import { BookSearchContext } from '../../context/bookSearchContext'
import { useBookSearch } from '../../hooks/useBookSearch'

export function SearchForm () {
  const { bookQuery } = useContext(BookSearchContext)
  const { handleSubmit, handleChange } = useBookSearch()

  const searchBookFormId = useId()
  const searchBookInputId = useId()

  return (
    <form id={searchBookFormId} onSubmit={handleSubmit} className='header-form'>
      <input
        id={searchBookInputId}
        type='text'
        onChange={handleChange}
        value={bookQuery}
        placeholder='Search book...'
      />
    </form>
  )
}
