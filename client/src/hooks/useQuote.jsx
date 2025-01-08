import { useEffect, useState } from 'react'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;


export function useQuote () {
  const [quoteData, setQuoteData] = useState({ quote: '', author: '', book: '' })
  const [loadingQuoteData, setLoadingQuoteData] = useState(true)

  // Fetch the random quote API
  useEffect(() => {
    if (!loadingQuoteData) return

    const fetchQuoteData = async () => {
      try {
        const response = await axios.get(apiUrl + '/api/external/random-quote')
        const { q, a } = response.data[0]
        setQuoteData({
          quote: q,
          author: a
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
