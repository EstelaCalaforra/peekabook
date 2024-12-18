export function BestsellersShelf ({ bestsellersData, loadingBestsellersData }) {
  return (
    <div className='bestsellers-row'>
      {loadingBestsellersData
        ? (
          <p>Loading bestsellers...</p>
          )
        : (
            bestsellersData.map((bookInfo, index) => (
              <div className='bestsellers-column bestsellers-shelf' key={index}>
                <a href='amazon.com'>
                  <img className='miniature' src={bookInfo.book_image} alt={bookInfo.title} />
                </a>
              </div>
            ))
          )}
    </div>
  )
}
