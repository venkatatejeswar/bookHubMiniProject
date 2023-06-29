import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {topRatedBooks: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',

      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.books.map(book => ({
        id: book.id,
        authorName: book.author_name,
        coverPic: book.cover_pic,
        title: book.title,
      }))
      this.setState({
        topRatedBooks: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onTryAgain = () => {
    this.getTopRatedBooks()
  }

  renderSlick = () => {
    const {topRatedBooks} = this.state
    const settings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <ul className="slider-list-container">
        <Slider {...settings}>
          {topRatedBooks.map(eachBook => {
            const {id, authorName, coverPic, title} = eachBook
            return (
              <Link to={`/books/${id}`} className="link" key={id}>
                <li className="slick-item">
                  <div className="slick-img-container">
                    <img className="logo-image" src={coverPic} alt="cover" />
                  </div>
                  <h1 className="slick-title">{title}</h1>
                  <p className="slick-author">{authorName}</p>
                </li>
              </Link>
            )
          })}
        </Slider>
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
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

  renderviews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSlick()
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-container">
          <div className="nxtbooks-container">
            <h1 className="nxtbooks-title">Find Your Next Favorite Books?</h1>
            <p className="nxtbooks-desc">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf" className="link">
              <button className="find-button-sm" type="button">
                Find Books
              </button>
            </Link>
          </div>
          <div className="slick-bg-container">
            <div className="top-rated-container">
              <h1 className="top_rated_title">Top Rated Books</h1>
              <Link to="/shelf" className="link">
                <button className="find-button-lg" type="button">
                  Find Books
                </button>
              </Link>
            </div>
            <div className="slick-cont">
              <div className="slick-container">{this.renderviews()}</div>
            </div>
          </div>
          <div className="contactus-container">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
