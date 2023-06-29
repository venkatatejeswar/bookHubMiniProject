import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onUsername = e => {
    this.setState({username: e.target.value, showError: false})
  }

  onPassword = e => {
    this.setState({password: e.target.value, showError: false})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      this.setState({showError: false, username: '', password: ''})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({
        showError: true,
        errorMsg: data.error_msg,
        username: '',
        password: '',
      })
    }
  }

  render() {
    const {username, password} = this.state
    const {showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dlkp3zido/image/upload/v1687269411/mobile_wexiw0.png"
          alt="website login"
          className="mobile-login-img"
        />
        <img
          src="https://res.cloudinary.com/dlkp3zido/image/upload/v1687267579/Rectangle_1467_ws9toa.png"
          alt="website login"
          className="desktop-login-img"
        />
        <div className="login-bg-container">
          <form className="form-container" onSubmit={this.onFormSubmit}>
            <div className="login-logo-container">
              <img
                src="https://res.cloudinary.com/dlkp3zido/image/upload/v1687269659/logo_eiw1vu.png"
                alt="login website logo"
                className="login-logo"
              />
            </div>
            <label htmlFor="username" className="label">
              Username*
            </label>
            <input
              type="text"
              id="username"
              className="login-input"
              placeholder="Enter Username"
              onChange={this.onUsername}
              value={username}
            />
            <label htmlFor="password" className="label">
              Password*
            </label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Enter Password"
              onChange={this.onPassword}
              value={password}
            />
            {showError && <p className="error-msg">{errorMsg}</p>}
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
