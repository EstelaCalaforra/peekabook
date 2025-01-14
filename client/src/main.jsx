import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import i18next from 'i18next'
import en from './locals/en.json'
import es from './locals/es.json'
import { BrowserRouter } from 'react-router-dom'

i18next.init({
  resources: {
    en: { translation: en },
    es: { translation: es }
  },
  lng: window.localStorage.getItem('langSelected') || 'en',
  fallbackLng: 'en'
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err)
  t('key') 
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
