import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'

const BookItem = props => {
  const {bookDetails} = props
  const {id, authorName, coverPic, rating, readStatus, title} = bookDetails
  return (
    <Link to={`/books/${id}`} className="link">
      <li className="book-item">
        <div className="coverpic-container">
          <img src={coverPic} alt="book logo" className="coverpic" />
        </div>
        <div className="bookitem-details-cont">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <p className="rating-title">Avg Rating</p>
            <AiFillStar className="star" />
            <p className="rating">{rating}</p>
          </div>
          <p className="status">
            Status: <span className="read-status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
