import express from 'express'
import { bookRouter } from './routes/bookRoutes'
import { authenticateToken } from './middleware/authMiddleware.js'

const app = express()

app.use(express.json())

// Aplicar autenticación a todas las rutas de libros
app.use('/api/books', bookRouter)

export default app
