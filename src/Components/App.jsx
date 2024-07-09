import { useState } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import Front from './Front'
import '../../public/styles/App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Header />
        <Front />
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App;
