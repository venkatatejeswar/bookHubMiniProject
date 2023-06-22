import './index.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const x = 10

  return (
    <header className="header">
      <Link to="/" className="link">
        <img
          src="https://res.cloudinary.com/dlkp3zido/image/upload/v1687269659/logo_eiw1vu.png"
          alt="logo"
          className="website logo"
        />
      </Link>
      <GiHamburgerMenu className="hamburger" />
      <ul className="menu-list">
        <Link to="/" className="link">
          <li className="menu-item">Home</li>
        </Link>
        <Link to="/" className="link">
          <li className="menu-item">Bookshelves</li>
        </Link>
        <button className="logout-btn" type="button">
          Logout
        </button>
      </ul>
    </header>
  )
}

export default withRouter(Header)
