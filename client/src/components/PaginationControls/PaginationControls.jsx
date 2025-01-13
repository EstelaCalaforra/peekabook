import i18next from 'i18next'

export function PaginationControls ({ currentPage, totalPages, handlePageChange }) {
  const renderPageNumbers = () => {
    const maxVisiblePages = 5
    const pages = []
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-number ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      )
    }

    return pages
  }

  return (
    <div className='pagination-controls'>
      <button
        className='previous'
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className='next'
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {i18next.t('Next')}

      </button>
    </div>
  )
}
