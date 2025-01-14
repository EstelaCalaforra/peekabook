import { Header } from './components/Header/Header.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { BookshelfPage } from './pages/BookshelfPage/BookshelfPage.jsx'
import { BookFindPage } from './pages/BookFindPage/BookFindPage.jsx'
import { IndividualBookPage } from './pages/IndividualBookPage/IndividualBookPage.jsx'
import { LoginPage } from './pages/LoginPage/LoginPage.jsx'
import { SignUpPage } from './pages/SignUpPage/SignUpPage.jsx'
import { CategoryPage } from './pages/CategoryPage/CategoryPage.jsx'
import { BookSearchProvider } from './context/bookSearchContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProtectedRoute } from './services/ProtectedRoute.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const routesMap = {
  en: {
    home: '/',
    bookSearch: '/book-search/:bookQuery',
    indBook: '/ind-book/:id',
    login: '/login',
    signUp: '/signup',
    bookshelf: '/bookshelf/:id',
    category: '/bookshelf/:userid/:category',
  },
  es: {
    home: '/es',
    bookSearch: '/es/buscar-libro/:bookQuery',
    indBook: '/es/libro-individual/:id',
    login: '/es/iniciar-sesion',
    signUp: '/es/registrarse',
    bookshelf: '/es/estanteria/:id',
    category: '/es/estanteria/:userid/:category',
  },
}

function App () {
  
  return (
    <BookSearchProvider>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route exact path='/' element={<HomePage />} />
          <Route path='/book-search/:bookQuery' element={<BookFindPage />} />
          <Route path='/ind-book/:id' element={<IndividualBookPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          {/* Protected Routes */}
          <Route path='/bookshelf/:id' element={<ProtectedRoute> <BookshelfPage /> </ProtectedRoute>} />
          <Route path='/bookshelf/:userid/:category' element={<ProtectedRoute> <CategoryPage /> </ProtectedRoute>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BookSearchProvider>
  )
}

export default App
