import { useEffect, useState } from 'react'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;
console.log({ apiUrl })
console.log(import.meta.env);

export function useBestSellers () {
  const [bestsellersData, setBestsellersData] = useState([])
  const [loadingBestsellersData, setLoadingBestsellersData] = useState(true)

  useEffect(() => {
    if (!loadingBestsellersData) return

    const fetchBestsellersData = async () => {
      try {
        const response = await axios.get(apiUrl + '/api/external/bestsellers')
        const { books } = response.data.results.lists[0]
        setBestsellersData(books)
      } catch (error) {
        console.log('Error fetching data:', error)
      } finally {
        setLoadingBestsellersData(false)
      }
    }
    fetchBestsellersData()
  }, [])

  return { bestsellersData, loadingBestsellersData }
}
