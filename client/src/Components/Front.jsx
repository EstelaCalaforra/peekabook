import bookPages from '../assets/book-pages.gif'
import divider from '../assets/set-hand-drawn-ornaments.png'
import Button from '@mui/material/Button';
import './styles/Front.css'


function Front() {
  
    return (
      <div className='front'>
        <img src={bookPages}></img>
        <div>
          <div className='quote'>
            <p>El misterio de la vida no es un problema a resolver, sino una realidad a experimentar.</p>
            <p>Dune, Frank Herbert</p>
          </div>
        </div>
        <div className='front-buttons'>
        <Button variant="contained">See library</Button>
        <Button variant="contained">Add new book</Button>
        </div>
      </div>
    );
  }
  
  export default Front;