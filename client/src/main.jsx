import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import i18n from 'i18next'
// import { initReactI18next } from 'react-i18next'

// i18n.use(initReactI18next).init({
//   resources: {
//     en: {
//       translation: {

//       }
//     },
//     es: {
//       translation: {

//       }
//     },
//   },
//   lng: 'en',
//   fallbackLng: 'en'
// })

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
