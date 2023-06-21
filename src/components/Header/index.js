import './index.css'
import {GiHamburgerMenu} from 'react-icons/gi'

const Header = () => (
  <div className="header">
    <img
      src="https://res.cloudinary.com/dlkp3zido/image/upload/v1687269659/logo_eiw1vu.png"
      alt="logo"
      className="header_img"
    />
    <GiHamburgerMenu className="hamburger" />
  </div>
)

export default Header
