import { query } from '../config/dbConfig'

export const findAll = async () => {
  try {
    const result = await query('SELECT * FROM users')
    return result.rows
  } catch (error) {
    console.error('Error en findAll:', error)
    throw error
  }
}

export const createUser = async (data) => {
  const { email, password } = data
  try {
    const result = await query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, password]
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error en createUser:', error)
    throw error
  }
}
