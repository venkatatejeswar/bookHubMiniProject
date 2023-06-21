import './index.css'
import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'

class Home extends Component {
  state = {topRatedBooks: []}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
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
    const updatedData = data.books.map(book => ({
      id: book.id,
      authorName: book.author_name,
      coverPic: book.cover_pic,
      title: book.title,
    }))
    this.setState({topRatedBooks: updatedData})
  }

  renderSlick = () => {
    const {topRatedBooks} = this.state
    const settings = {
      dots: false,
      slidesToShow: 3,
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
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachBook => {
          const {id, authorName, coverPic, title} = eachBook
          return (
            <div className="slick-item" key={id}>
              <div className="slick-img-container">
                <img className="logo-image" src={coverPic} alt="cover" />
              </div>
              <p className="slick-title">{title}</p>
              <p className="slick-author">{authorName}</p>
            </div>
          )
        })}
      </Slider>
    )
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
            <button className="find-button-sm" type="button">
              Find Books
            </button>
          </div>
          <div className="slick-bg-container">
            <div className="top-rated-container">
              <p className="top_rated_title">Top Rated Books</p>
              <button className="find-button-lg" type="button">
                Find Books
              </button>
            </div>
            <div className="slick-cont">
              <div className="slick-container">{this.renderSlick()}</div>
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
