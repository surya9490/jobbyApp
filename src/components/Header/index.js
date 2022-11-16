import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <ul className="home-jobs-container">
        <Link to="/">
          <li className="home">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="jobs">jobs</li>
        </Link>
      </ul>
      <li>
        <button className="logout-button" onClick={onClickLogout} type="button">
          Logout
        </button>
      </li>
    </nav>
  )
}

export default withRouter(Header)
