import { useQuote } from '../../hooks/useQuote'
import i18next from 'i18next'

export function Quote () {
  const { quoteData, loadingQuoteData } = useQuote()

  return (
    <>
      <h3 className='title'>{i18next.t('Daily quote')}</h3>
      <div className='quote quote-column'>
        <div>
          {loadingQuoteData
            ? (
              
              <p>{i18next.t('Loading quote')}...</p>
            )
            : (
              <div className='quote-row'>
                <div>
                  <p className='quote-text'>&quot;{quoteData.quote}&quot;</p>
                  <p>{quoteData.author}</p>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  )
}
