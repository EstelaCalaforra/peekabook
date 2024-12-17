import { useQuote } from '../../hooks/useQuote'
import RightBrace from '../../assets/brace-right.png'
import LeftBrace from '../../assets/brace-left.png'

export function Quote () {
  const { quoteData, loadingQuoteData } = useQuote()

  return (
    <div className='quote column'>
      {/* <h3 className='title'>Daily quote</h3> */}
      <div>
        {loadingQuoteData
          ? (
            <p>Loading quote...</p>
            )
          : (
            <div className='row'>
              <img src={RightBrace} />
              <div>
                <p>{quoteData.quote}</p>
                <p>{quoteData.author}</p>
              </div>
              <img src={LeftBrace} />
            </div>
            )}
      </div>
    </div>
  )
}
