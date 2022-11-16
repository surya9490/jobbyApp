import {Link} from 'react-router-dom'
import {BiMap} from 'react-icons/bi'
import {BsStar, BsBriefcase} from 'react-icons/bs'

import './index.css'

const SimilarItem = props => {
  const {eachSimilarJob} = props
  const {id} = eachSimilarJob

  return (
    <li className="each-similar-item-container">
      <Link to={`/jobs/${id}`}>
        <div className="icon-rating-container">
          <img
            className="item-icon"
            src={eachSimilarJob.companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="title-rating-container">
            <h1 className="display-title">{eachSimilarJob.title}</h1>
            <div className="star-rating-container">
              <BsStar className="star" />
              <p className="rating">{eachSimilarJob.rating}</p>
            </div>
          </div>
        </div>
        <h4 className="similar-description">Description</h4>
        <p className="similar-info">{eachSimilarJob.jobDescription}</p>
        <div className="location-type-amount-container">
          <div className="location-type-container">
            <div className="location-container">
              <BiMap className="location-icon" />
              <p className="location">{eachSimilarJob.location}</p>
            </div>
            <div className="type-container">
              <BsBriefcase className="type-icon" />
              <p className="type">{eachSimilarJob.employmentType}</p>
            </div>
          </div>
          <p className="package">{eachSimilarJob.packagePerAnnum}</p>
        </div>
      </Link>
    </li>
  )
}

export default SimilarItem
