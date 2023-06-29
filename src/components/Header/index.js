import {Component} from 'react'
import './index.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import {GrFormClose} from 'react-icons/gr'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

class Header extends Component {
  state = {showMenu: false}

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onHamMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  render() {
    const {showMenu} = this.state
    return (
      <>
        <header className="header">
          <Link to="/" className="link desktop-header-logo">
            <img
              src="https://res.cloudinary.com/dlkp3zido/image/upload/v1688039991/desktop_vs1eiu.png"
              alt="website logo"
              className="desktop-header-logo"
            />
          </Link>
          <Link to="/" className="link mobile-header-logo">
            <img
              src="https://res.cloudinary.com/dlkp3zido/image/upload/v1688040140/mobile_xivteq.png"
              alt="website logo"
              className="mobile-header-logo"
            />
          </Link>
          <GiHamburgerMenu className="hamburger" onClick={this.onHamMenu} />
          <ul className="menu-list">
            <Link to="/" className="link">
              <li className="menu-item">Home</li>
            </Link>
            <Link to="/shelf" className="link">
              <li className="menu-item">Bookshelves</li>
            </Link>
            <button
              className="logout-btn"
              type="button"
              onClick={this.onLogout}
            >
              Logout
            </button>
          </ul>
        </header>
        {showMenu && (
          <ul className="mobile-menu-list">
            <Link to="/" className="link">
              <li className="menu-item">
                <nav>Home</nav>
              </li>
            </Link>
            <Link to="/shelf" className="link">
              <li className="menu-item">
                <nav>Bookshelves</nav>
              </li>
            </Link>
            <button
              className="logout-btn"
              type="button"
              onClick={this.onLogout}
            >
              Logout
            </button>
            <GrFormClose className="close-icon" onClick={this.onHamMenu} />
          </ul>
        )}
      </>
    )
  }
}

export default withRouter(Header)
