import { useEffect, useState } from 'react'
import axios from 'axios'

export function useBestSellers () {
  const [bestsellersData, setBestsellersData] = useState([]) // Estado inicial vacío
  const [loadingBestsellersData, setLoadingBestsellersData] = useState(true) // Controla el estado de carga

  useEffect(() => {
    if (!loadingBestsellersData) return

    const fetchBestsellersData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-bestsellers')
        const { books } = response.data.results.lists[0]
        setBestsellersData(books)
      } catch (error) {
        console.log('Error al obtener los datos:', error)
      } finally {
        setLoadingBestsellersData(false)
      }
    }
    fetchBestsellersData()
  }, [])

  return { bestsellersData, loadingBestsellersData }
}
