import './styles/Footer.css'

function Footer() {
    const currentYear = new Date().getFullYear()
  
    return (
      <footer>
        <p>&copy; {currentYear} Peek-a-book. Ningún derecho reservado.</p>
      </footer>
    );
  }
  
  export default Footer