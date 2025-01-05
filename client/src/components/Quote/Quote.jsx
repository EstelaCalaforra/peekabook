import { useQuote } from '../../hooks/useQuote'
import AuthorPhoto from '../../assets/haruki-murakami-pfp.png'

export function Quote () {
  const { quoteData, loadingQuoteData } = useQuote()

  return (
    <>
      <h3 className='title'>Daily quote</h3>
      <div className='quote quote-column'>
        <div>
          {loadingQuoteData
            ? (
              <p>Loading quote...</p>
              )
            : (
              <div className='quote-row'>
                <div>
                  <p>&quot;{quoteData.quote}&quot;</p>
                  <p>{quoteData.author}</p>
                </div>
                <img src={AuthorPhoto} />
              </div>
              )}
        </div>
      </div>
    </>
  )
}
