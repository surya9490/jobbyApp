import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsStar, BsBriefcase} from 'react-icons/bs'
import {BiMap} from 'react-icons/bi'

import Header from '../Header'
import SimilarItems from '../SimilarItems'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, eachItem: []}

  componentDidMount() {
    this.jobDetailsApiUrl()
  }

  jobDetailsApiUrl = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        skills: data.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        similarJobs: data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
      }
      console.log(jobDetails)
      this.setState({
        apiStatus: apiStatusConstants.success,
        eachItem: jobDetails,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderEachJobItemDetails = () => {
    const {eachItem} = this.state
    const {lifeAtCompany, skills, similarJobs} = eachItem
    return (
      <div className="each-item-container">
        <div className="each-item-card">
          <div className="icon-rating-container">
            <img
              className="item-icon"
              src={eachItem.companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title-rating-container">
              <h1 className="display-title">{eachItem.title}</h1>
              <div className="star-rating-container">
                <BsStar className="star" />
                <p className="rating">{eachItem.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-amount-container">
            <div className="location-type-container">
              <div className="location-container">
                <BiMap className="location-icon" />
                <p className="location">{eachItem.location}</p>
              </div>
              <div className="type-container">
                <BsBriefcase className="type-icon" />
                <p className="type">{eachItem.employmentType}</p>
              </div>
            </div>
            <p className="package">{eachItem.packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <h4 className="description">Description</h4>
          <p className="job-info">{eachItem.jobDescription}</p>
          <h4 className="skills">Skills</h4>
          <ul className="all-skills-container">
            {skills.map(eachSkill => (
              <li className="skills-container" key={eachSkill.name}>
                <img
                  className="skills-image"
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                />
                <p className="skills-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h4 className="life-company">Life at Company</h4>
          <div className="description-website-container">
            <p className="life-description">{lifeAtCompany.description}</p>
            <img
              className="life-image"
              src={lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h4 className="similar-item">Similar Jobs</h4>
        <ul className="similar-items-container">
          {similarJobs.map(eachSimilarJob => (
            <SimilarItems
              key={eachSimilarJob.id}
              eachSimilarJob={eachSimilarJob}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => {
    console.log('failure')

    return <FailureView />
  }

  renderJobItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderEachJobItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobItemDetails()}
      </>
    )
  }
}

export default JobItemDetails
