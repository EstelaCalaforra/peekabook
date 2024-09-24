import myPhoto from '../assets/mi-foto.jpg'
import myLibraryPhoto from '../assets/my-library.jpg'
import mySonsPhoto from '../assets/my-sons.jpg'
import './styles/About.css'
import { SocialIcon } from 'react-social-icons'

function About () {
  return (
    <div className='about-container'>
      <div className='about-myself-container'>
        <h2>Myself</h2>
        <img src={myPhoto} />
        <div className='about-myself'>
          <p>Hi! I'm Estela. I'm a simple girl that loves slow life.
            I enjoy sitting with my books, my coffe, my sweets and
            my cats. Whenever I'm not reading or roting in bed I'm coding.
          </p>
        </div>
        <div className='socials-container'>
          <SocialIcon url='https://twitter.com' />
          <SocialIcon url='https://instagram.com' />
        </div>
      </div>
      <div className='about-my-library-container'>
        <h2>My library</h2>
        <img src={myLibraryPhoto} />
        <div className='about-my-library'>
          <p>Modest but condensed. Almost everything I own it's stolen
            (with permision) from my parent's house. Recently I've started
            to fill it with (mostly) thrifted and (some) brand-new books.
            My dream is to cover my whole walls whith dusty libraries.
          </p>
        </div>
      </div>
      <div className='about-my-sons-container'>
        <h2>My sons</h2>
        <img src={mySonsPhoto} />
        <div className='about-my-sons'>
          <p>These are Nia (3) and Rex ({'<'}1), the fluffiest sources of happiness.
            They make my day better. The perfect combo of clinginess and madness.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
