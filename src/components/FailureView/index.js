import './index.css'

const FailureView = () => (
  <div className="failure-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure view"
      className="failure-image"
    />
    <h1 className="failure-header">Oops! Something Went Wrong</h1>
    <p className="failure">
      We Cannot seem to find the page you are looking for{' '}
    </p>
    <button className="failure-button" type="button">
      Retry
    </button>
  </div>
)
export default FailureView
