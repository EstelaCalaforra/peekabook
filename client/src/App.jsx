import './App.css'
import { Header } from './components/Header/Header.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { BookshelfPage } from './pages/BookshelfPage/BookshelfPage.jsx'
import { BookFindPage } from './pages/BookFindPage/BookFindPage.jsx'
import { IndividualBookPage } from './pages/IndividualBookPage/IndividualBookPage.jsx'
import { LoginPage } from './pages/LoginPage/LoginPage.jsx'
import { SignUpPage } from './pages/SignUpPage/SignUpPage.jsx'
import { CategoryPage } from './pages/CategoryPage/CategoryPage.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BookSearchProvider } from './context/bookSearchContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProtectedRoute } from './services/ProtectedRoute.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#85644d',
      light: '#ceab8c',
      dark: '#3f3230',
      contrastText: '#F5F5F5'
    },
    secondary: {
      main: '#b09c87',
      light: '#F5F5F5',
      dark: '#F5F5F5',
      contrastText: '#F5F5F5'
    }
  }
})

function App () {
  return (
    <div>
      <Router>
        <BookSearchProvider>
          <AuthProvider>
            <ThemeProvider theme={customTheme}>
              <Header />
              <Routes>
                {/* Public Routes */}
                <Route exact path='/' element={<HomePage />} />
                <Route path='/book-search' element={<BookFindPage />} />
                <Route path='/ind-book/:id' element={<IndividualBookPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                {/* Protected Routes */}
                <Route path='/bookshelf/:id' element={<ProtectedRoute> <BookshelfPage /> </ProtectedRoute>} />
                <Route path='/bookshelf/:userid/:category' element={<ProtectedRoute> <CategoryPage /> </ProtectedRoute>} />
              </Routes>
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </BookSearchProvider>
      </Router>
    </div>
  )
}

export default App
