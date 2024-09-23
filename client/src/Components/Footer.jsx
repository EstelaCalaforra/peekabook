import './styles/Footer.css'

export function Footer () {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <p>&copy; {currentYear} Peekabook. Ningún derecho reservado.</p>
    </footer>
  )
}
