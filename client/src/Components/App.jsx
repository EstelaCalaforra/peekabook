import { useState, useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import './styles/App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


const customTheme = createTheme({
  palette: {
    primary: {
      main: '#F5F5F5',
      light: '#F5F5F5',
      dark: '#F5F5F5',
      contrastText: '#F5F5F5'
    },
    secondary: {
      main: '#F5F5F5',
      light: '#F5F5F5',
      dark: '#F5F5F5',
      contrastText: '#F5F5F5',
    },
  },
});

function App() {

  return (
    <div>
      <Router>
      <ThemeProvider theme={customTheme}>
        <Header />
        <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        <Footer />
      </ThemeProvider>
      </Router>
    </div>
  )
}

export default App;
