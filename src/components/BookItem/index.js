import './index.css'
import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const BookItem = props => {
  const {bookDetails} = props
  const {id, authorName, coverPic, rating, readStatus, title} = bookDetails
  return (
    <Link to={`/books/${id}`} className="link">
      <li className="book-item">
        <div className="coverpic-container">
          <img src={coverPic} alt={title} className="shelf-coverpic" />
        </div>
        <div className="bookitem-details-cont">
          <h1 className="shelf-title">{title}</h1>
          <p className="bookitem-author">{authorName}</p>
          <div className="shelf-rating-container">
            <p className="shelf-rating-title">Avg Rating</p>
            <BsFillStarFill className="shelf-star" />
            <p className="shelf-rating">{rating}</p>
          </div>
          <p className="shelf-status">
            Status: <span className="shelf-read-status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
