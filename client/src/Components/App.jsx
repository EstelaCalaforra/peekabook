import { Header } from './Header'
import { Footer } from './Footer'
import { Home } from './Home'
import { Bookshelf } from './Bookshelf'
import { BookInfo } from './BookInfo'
import './styles/App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BookSearchProvider } from '../context/bookSearchContext'
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
              <Route exact path='/' element={<Home />} />
              <Route path='/bookshelf' element={<Bookshelf />} />
              <Route path='/book-info' element={<BookInfo />} />
            </Routes>
            <Footer />
          </ThemeProvider>
        </BookSearchProvider>
      </Router>
    </div>
  )
}

export default App
