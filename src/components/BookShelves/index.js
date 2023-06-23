import {Component} from 'react'
import './index.css'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import Footer from '../Footer'

import Header from '../Header'
import BookItem from '../BookItem'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  nobooks: 'NO BOOKS',
}

class BookShelves extends Component {
  state = {
    booksList: [],
    bookshelfName: bookshelvesList[0].value,
    searchText: '',
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getBooksList()
  }

  getBooksList = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {bookshelfName, searchText} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      if (data.books.length === 0) {
        this.setState({apiStatus: apiConstants.nobooks})
      } else {
        const updatedData = data.books.map(book => ({
          id: book.id,
          authorName: book.author_name,
          coverPic: book.cover_pic,
          rating: book.rating,
          readStatus: book.read_status,
          title: book.title,
        }))
        this.setState({booksList: updatedData, apiStatus: apiConstants.success})
      }
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onTryAgain = () => {
    this.getBooksList()
  }

  onBookshelfName = event => {
    this.setState({bookshelfName: event.target.value}, this.getBooksList)
  }

  onSearchText = event => {
    this.setState({searchText: event.target.value}, this.getBooksList)
  }

  onSearchClick = () => {
    this.getBooksList()
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
      <p className="failure_title">Something went wrong. Please try again</p>
      <button type="button" className="tryagain_btn" onClick={this.onTryAgain}>
        Try Again
      </button>
    </div>
  )

  renderBooksItem = () => {
    const {booksList} = this.state
    return (
      <ul className="books-listitems">
        {booksList.map(book => (
          <BookItem bookDetails={book} key={book.id} />
        ))}
      </ul>
    )
  }

  renderNoBooksView = () => {
    const {searchText} = this.state
    return (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/dlkp3zido/image/upload/v1687520196/no_result_bfxnwu.png"
          alt="no books"
        />
        <p className="failure_title">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderviews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderBooksItem()
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.nobooks:
        return this.renderNoBooksView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {bookshelfName, searchText} = this.state
    const bookShelf = bookshelvesList.find(each => each.value === bookshelfName)

    return (
      <div className="bookshelves-container">
        <Header />
        <div className="bookshelves-btm-container">
          <div className="desktop-filters-container">
            <h1 className="bookshelves-title">Bookshelves</h1>
            <ul className="desktop-bookshelves-filters">
              {bookshelvesList.map(filter => (
                <li key={filter.id}>
                  <button
                    value={filter.value}
                    className={
                      filter.value === bookshelfName
                        ? 'desktop-active-filter-btn'
                        : 'desktop-filter-btn'
                    }
                    type="button"
                    onClick={this.onBookshelfName}
                  >
                    {filter.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="books-container">
            <div className="allbooks-input-container">
              <h1 className="allbooks-title">{bookShelf.label} Books</h1>
              <div className="input-container">
                <input
                  type="search"
                  className="input"
                  placeholder="Search"
                  value={searchText}
                  onChange={this.onSearchText}
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.onSearchClick}
                  testid="searchButton"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            <div className="mobile-filters-container">
              <h1 className="bookshelves-title">Bookshelves</h1>
              <ul className="bookshelves-filters">
                {bookshelvesList.map(filter => (
                  <li key={filter.id}>
                    <button
                      value={filter.value}
                      className={
                        filter.value === bookshelfName
                          ? 'active-filter-btn'
                          : 'filter-btn'
                      }
                      type="button"
                      onClick={this.onBookshelfName}
                    >
                      {filter.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bookslist-container">{this.renderviews()}</div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves
