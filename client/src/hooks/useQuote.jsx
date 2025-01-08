import { useEffect, useState } from 'react'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;

export function useQuote () {
  const [quoteData, setQuoteData] = useState({ quote: '', author: '', book: '' })
  const [loadingQuoteData, setLoadingQuoteData] = useState(true)

  // Fetch the random quote API
  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const response = await axios.get(apiUrl + '/api/external/random-quote')
        const { q, a } = response.data[0]
        setQuoteData({
          quote: q,
          author: a
        })
        if (q) {
          setLoadingQuoteData(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchQuoteData()
  }, [])

  return { quoteData, loadingQuoteData }
}
