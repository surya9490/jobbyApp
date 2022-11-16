import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <h1 className="home-header">
        Find The Job That <br /> Fits Your Life
      </h1>
      <p className="home-info">
        Millions of people are searching for jobs, salary <br />
        information, company reviews. Find the job that fits your <br />
        abilities and potential
      </p>
      <Link to="/jobs">
        <button className="find-jobs-button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
