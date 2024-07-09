import './App.css'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import SearchIcon from '@mui/icons-material/Search'
import bookLogo from './assets/book-logo.png'
import TextField from '@mui/material/TextField'

function Header() {
    return (
        <header className="header">
            <img src={bookLogo} alt="Company Logo" className="logo" />
            <nav>
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            <div className='search-field'>
                <SearchIcon themeColor="light"/>
                <TextField id="outlined-basic" label="Search" variant="outlined" />
            </div>
            
        </header>
    );
}

export default Header;