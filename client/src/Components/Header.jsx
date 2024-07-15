import './styles/Header.css';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import searchIcon from '../assets/search-icon.svg';
import bookLogo from '../assets/logo-pick.png';
import TextField from '@mui/material/TextField';


function Header() {

    // const TextFieldProps = {
    //     color: 'text.primary' | 'inherit', // default text.primary
    //     accentColor: 'primary' | 'secondary', // default primary
    //   }

    return (
        <header>
            <div className="header">
                <div className='img-and-nav'>
                    <img src={bookLogo} alt="Company Logo" className="logo" />
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li> 
                            <li><a href="/about">About</a></li>
                            <li><a href="/library">Library</a></li>
                        </ul>
                    </nav>
                </div>
                
                <div className='search-field'>
                    {/* <img src={searchIcon} alt="Seacrh Icon" className="search-icon" /> */}
                    <TextField id="outlined-basic" label="Search" variant="outlined" autoComplete='off' color="secondary" focused />
                </div>
            </div>
        </header>        
    );
}

export default Header;