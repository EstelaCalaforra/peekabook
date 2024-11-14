import axios from 'axios'
import { useLocation } from 'react-router-dom'

export function CategoryPage () {
  const location = useLocation()
  const category = location.state

  console.log({ category })
  return (
    <h2>{category} shelf</h2>
  )
}
