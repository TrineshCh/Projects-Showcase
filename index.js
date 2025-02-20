import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectItem from '../ProjectItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const projectsApiUrl = 'https://apis.ccbp.in/ps/projects'

class Home extends Component {
  state = {
    projectDetails: [],
    apiStatus: apiStatusConstants.initial,
    selectedCategory: 'ALL',
  }

  componentDidMount() {
    this.fetchProjects()
  }

  fetchProjects = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {selectedCategory} = this.state
    const response = await fetch(
      `${projectsApiUrl}?category=${selectedCategory}`,
    )
    if (response.ok) {
      const data = await response.json()
      this.setState({
        projectDetails: data.projects,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeCategory = event => {
    this.setState({selectedCategory: event.target.value}, this.fetchProjects)
  }

  renderProjectsList = () => {
    const {projectDetails} = this.state
    return (
      <ul className="projects-list">
        {projectDetails.map(project => (
          <ProjectItem key={project.id} projectDetails={project} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.fetchProjects}>
        Retry
      </button>
    </div>
  )

  render() {
    const {categoriesList} = this.props
    const {apiStatus, selectedCategory} = this.state

    return (
      <div>
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="head-img"
          />
        </div>
        <div className="projects-cont">
          <select value={selectedCategory} onChange={this.onChangeCategory}>
            {categoriesList.map(category => (
              <option key={category.id} value={category.id}>
                {category.displayText}
              </option>
            ))}
          </select>

          {apiStatus === apiStatusConstants.inProgress && this.renderLoader()}
          {apiStatus === apiStatusConstants.failure && this.renderFailureView()}
          {apiStatus === apiStatusConstants.success &&
            this.renderProjectsList()}
        </div>
      </div>
    )
  }
}

export default Home
