import '../../public/styles/Footer.css'

function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer>
        <p>&copy; {currentYear} Biblioteca de Estela. Ningún derecho reservado.</p>
      </footer>
    );
  }
  
  export default Footer;