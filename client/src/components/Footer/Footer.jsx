import './Footer.css'
import i18next from 'i18next'

export function Footer () {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <p>&copy; {currentYear} Peekabook. {i18next.t('No rights reserved')}.</p>
    </footer>
  )
}
