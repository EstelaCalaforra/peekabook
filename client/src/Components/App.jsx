import './styles/App.css'
import { Header } from './Header'
import { Footer } from './Footer'
import { HomePage } from './HomePage'
import { BookshelfPage } from './BookshelfPage'
import { BookFindPage } from './BookFindPage'
import { IndividualBookPage } from './IndividualBookPage'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BookSearchProvider } from '../context/bookSearchContext'
import { LoginPage } from './LoginPage'
import { SignUpPage } from './SignUpPage'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

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
          <ThemeProvider theme={customTheme}>
            <Header />
            <Routes>
              <Route exact path='/' element={<HomePage />} />
              <Route path='/bookshelf' element={<BookshelfPage />} />
              <Route path='/book-search' element={<BookFindPage />} />
              <Route path='/ind-book' element={<IndividualBookPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignUpPage />} />
            </Routes>
            <Footer />
          </ThemeProvider>
        </BookSearchProvider>
      </Router>
    </div>
  )
}

export default App
