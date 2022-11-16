import {Link} from 'react-router-dom'
import {BsStar, BsBriefcase} from 'react-icons/bs'
import {BiMap} from 'react-icons/bi'

import './index.css'

const JobList = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachItem
  return (
    <li className="display-item-container">
      <Link to={`/jobs/${id}`}>
        <div className="icon-rating-container">
          <img
            className="item-icon"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="title-rating-container">
            <h1 className="display-title">{title}</h1>
            <div className="star-rating-container">
              <BsStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-amount-container">
          <div className="location-type-container">
            <div className="location-container">
              <BiMap className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="type-container">
              <BsBriefcase className="type-icon" />
              <p className="type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h4 className="description">Description</h4>
        <p className="job-info">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobList
