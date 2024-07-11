import './styles/Header.css'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import searchIcon from '../assets/search-icon.svg'
import bookLogo from '../assets/icon-whitesmoke-book.svg'
import TextField from '@mui/material/TextField'


function Header() {

    return (
        <header>
            <div className="header">
                <div className='img-and-nav'>
                    <img src={bookLogo} alt="Company Logo" className="logo" />
                    <nav>
                        <ul>
                            <li><a href="/about">About</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </nav>
                </div>
                <div className='search-field'>
                    <img src={searchIcon} alt="Seacrh Icon" className="search-icon" />

                    <TextField id="outlined-basic" label="Search" variant="outlined" autoComplete='off'/>
                </div>
            </div>
        </header>
        
    );
}

export default Header;