import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/dlkp3zido/image/upload/v1687422288/Group_7484_xknoi7.png"
      alt="not found"
      className="notfound-img"
    />
    <h1 className="notfound-title">Page Not Found</h1>
    <p className="notfound-desc">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/" className="link">
      <button className="notfound-btn" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
