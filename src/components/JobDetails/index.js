import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FilterGroup from '../FilterGroup'
import JobList from '../JobList'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    profileData: '',
    range: '',
    typeList: [],
    searchInput: '',
    userSearch: '',
    profileApi: true,
    type: '',
    displayData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.jobsApiUrl()
    this.profileApiUrl()
  }

  selectedSalaryRange = value => {
    this.setState({range: value}, this.renderJobSearchDetails)
  }

  getTypeOfEmployment = value => {
    this.setState({type: value}, this.renderJobSearchDetails)
  }

  onChangeSearchInput = event => {
    const input = event.target.value
    const upperCase = input.toUpperCase()
    this.setState({userSearch: upperCase})
  }

  onclickSearch = () => {
    const {userSearch} = this.state
    this.setState({searchInput: userSearch}, this.renderJobSearchDetails)
  }

  profileApiUrl = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    console.log(response.ok)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({profileData: profileDetails})
    } else {
      console.log('profile view failure')
      this.setState({profileApi: false})
    }
  }

  jobsApiUrl = async () => {
    const {type, range, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${range}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const formatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        displayData: formatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState(
        {apiStatus: apiStatusConstants.failure},
        this.renderProfileDetails,
      )
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    const {profileData, typeList, profileApi} = this.state
    console.log(profileApi)
    return (
      <div className="details-container">
        <div className="filter-container">
          {profileApi ? (
            <FilterGroup
              key={profileData.name}
              profileData={profileData}
              selectedSalaryRange={this.selectedSalaryRange}
              typeList={typeList}
              getTypeOfEmployment={this.getTypeOfEmployment}
            />
          ) : (
            this.renderProfileFailureView()
          )}
        </div>
        <FailureView />
      </div>
    )
  }

  renderProfileFailureView = () => {
    console.log('succes profiel')
    return (
      <div>
        <button className="failure-button" type="button">
          Retry
        </button>
      </div>
    )
  }

  renderJobsDetailsPage = () => {
    const {profileData, displayData, typeList, profileApi} = this.state
    console.log(profileApi)
    return (
      <div className="details-container">
        <div className="filter-container">
          {profileApi ? (
            <FilterGroup
              key={profileData.name}
              profileData={profileData}
              selectedSalaryRange={this.selectedSalaryRange}
              typeList={typeList}
              getTypeOfEmployment={this.getTypeOfEmployment}
            />
          ) : (
            this.renderProfileFailureView()
          )}
        </div>
        <div className="display-container">
          <div className="search-container">
            <input
              className="search-input"
              type="search"
              placeholder="search"
              onChange={this.onChangeSearchInput}
              value="search"
            />
            <button type="button" onClick={this.onclickSearch}>
              <BsSearch className="search-icon" />{' '}
            </button>
          </div>

          <ul className="display-items-container">
            {displayData.map(eachItem => (
              <JobList key={eachItem.id} eachItem={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsDetailsPage()
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
        {this.renderJobDetails()}
      </>
    )
  }
}
export default JobDetails
