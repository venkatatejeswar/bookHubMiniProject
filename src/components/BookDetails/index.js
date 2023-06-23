import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {bookdetails: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.renderBookDetails()
  }

  renderBookDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const URL = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(URL, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        id: data.book_details.id,
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({bookdetails: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onTryAgain = () => {
    this.renderBookDetails()
  }

  renderLoader = () => (
    <div className="bookdetails-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dlkp3zido/image/upload/v1687363413/failure_img_ur7hnb.png"
        alt="failure view"
      />
      <p className="failure_title">Something went wrong, Please try again.</p>
      <button type="button" className="tryagain_btn" onClick={this.onTryAgain}>
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {bookdetails} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookdetails
    return (
      <div className="bookdetails-success-container">
        <div className="bookdetails-card-container">
          <div className="book-info-container">
            <img src={coverPic} alt={title} className="coverpic" />
            <div className="info-container">
              <h1 className="title">{title}</h1>
              <p className="author">{authorName}</p>
              <div className="rating-container">
                <p className="rating-title">Avg Rating</p>
                <BsFillStarFill className="star" />
                <p className="rating">{rating}</p>
              </div>
              <p className="status">
                Status: <span className="read-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="h-rule" />
          <div className="about-container">
            <h1 className="about-title">About Author</h1>
            <p className="about-desc">{aboutAuthor}</p>
            <h1 className="about-title">About Book</h1>
            <p className="about-desc">{aboutBook}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderviews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="book-details-container">
        <Header />
        <div className="bookdetails-container">{this.renderviews()}</div>
      </div>
    )
  }
}

export default BookDetails
