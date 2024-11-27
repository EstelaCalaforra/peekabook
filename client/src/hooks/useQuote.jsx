import { useEffect, useState } from 'react'
import axios from 'axios'

export function useQuote () {
  const [quoteData, setQuoteData] = useState({ quote: '', author: '', book: '' })
  const [loadingQuoteData, setLoadingQuoteData] = useState(true) // Controla el estado de carga

  // fetch the random quote API
  useEffect(() => {
    if (!loadingQuoteData) return

    const fetchQuoteData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/external/random-quote')
        const { quote, author, book } = response.data
        setQuoteData({
          quote,
          author,
          book
        })
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingQuoteData(false)
      }
    }
    fetchQuoteData()
  }, [])

  return { quoteData, loadingQuoteData }
}
