import { useQuote } from '../../hooks/useQuote'
import i18next from 'i18next'
import './Quote.css'

export function Quote () {
  const { quoteData, loadingQuoteData } = useQuote()

  return (
    <>
      {loadingQuoteData
        ? (
              
          <p className='loading'>{i18next.t('Loading quote')}...</p>
        )
        : (
          <div className='text-author'>
            <div>
              <p className='text'>&quot;{quoteData.quote}&quot;</p>
              <p>{quoteData.author}</p>
            </div>
          </div>
        )}
    </>
  )
}
