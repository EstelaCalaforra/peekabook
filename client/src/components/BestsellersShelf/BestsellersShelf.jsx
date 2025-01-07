export function BestsellersShelf ({ bestsellersData, loadingBestsellersData }) {
  return (
    <div className='bestsellers-row'>
      {loadingBestsellersData
        ? (
          <p>Loading bestsellers...</p>
          )
        : (
            bestsellersData.map((bookInfo, index) => (
              <div className='bestsellers-shelf bestsellers-column' key={index}>
                <img className='miniature' src={bookInfo.book_image} alt={bookInfo.title} />
                <a className='button' href={bookInfo.buy_links[0].url}>Buy now</a>
              </div>
            ))
          )}
    </div>
  )
}
