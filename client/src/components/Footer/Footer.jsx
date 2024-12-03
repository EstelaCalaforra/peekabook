import './Footer.css'

export function Footer () {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <p>&copy; {currentYear} Pickabook. Ningún derecho reservado.</p>
    </footer>
  )
}
