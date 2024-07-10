import { useState, useEffect } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import Front from './Front'
import './styles/App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from "axios";

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#774336',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#463131',
      light: '#ba7d54',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#774336',
    },
  },
});

function App() {

  const [backendData, setBackendData] = useState({ books: [] });
   // fetch the backend API
   useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("hola2");
        const response = await axios.get('http://localhost:5000/api', {
          headers: {
            'Accept': 'application/json',
          }
        });
        console.log(response);
        console.log(response.data);
        setBackendData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    console.log("hola1");
    fetchData();
  }, []);

  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <Header />
        {(typeof backendData.books === 'undefined' || backendData.books.length === 0) ? (
          <p>Loading...</p>
        ) : (
          backendData.books.map((book, index) => (
            <p key={index}>{book}</p>
          ))
        )}
        <Front />
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default App;
