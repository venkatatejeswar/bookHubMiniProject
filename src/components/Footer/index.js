import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer">
    <footer className="footer-icons">
      <FaGoogle className="icon" />
      <FaTwitter className="icon" />
      <FaInstagram className="icon" />
      <FaYoutube className="icon" />
    </footer>
    <p className="contact_title">Contact Us</p>
  </div>
)

export default Footer
