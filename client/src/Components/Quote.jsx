import { useQuote } from '../hooks/useQuote'

export function Quote () {
  const { quoteData, loadingQuoteData } = useQuote()

  return (
    <div className='quote column'>
      <h3 className='title'>Daily quote</h3>
      <div>
        {loadingQuoteData
          ? (
            <p>Loading quote...</p>
            )
          : (
            <div>
              <p>{quoteData.quote}</p>
              <p>{quoteData.author} &#40;{quoteData.book}&#41;</p>
            </div>
            )}
      </div>
    </div>
  )
}
