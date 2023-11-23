import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',

  success: 'SUCCESS',

  failure: 'FAILURE',

  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},

  {id: 'JAVASCRIPT', language: 'Javascript'},

  {id: 'RUBY', language: 'Ruby'},

  {id: 'JAVA', language: 'Java'},

  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,

    repositoriesData: [],

    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilterId} = this.state

    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })

    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`

    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.popular_repos.map(eachRepository => ({
        name: eachRepository.name,

        id: eachRepository.id,

        issuesCount: eachRepository.issues_count,

        forksCount: eachRepository.forks_count,

        starsCount: eachRepository.stars_count,

        avatarUrl: eachRepository.avatar_url,
      }))

      this.setState({
        repositoriesData: updatedData,

        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />

      <h1 className="heading">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryListView = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repo-list">
        {repositoriesData.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            repositoryDetails={eachRepository}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderRepositoryListView()

      case apiStatusConstant.failure:
        return this.renderFailureView()

      case apiStatusConstant.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  ActiveLanguageFilterId = newFilterId => {
    this.setState({activeLanguageFilterId: newFilterId}, this.getRepositories)
  }

  renderLanguageList = () => {
    const {activeLanguageFilterId} = this.state

    return (
      <ul>
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            isActive={each.id === activeLanguageFilterId}
            languageFilterDetails={each}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="card-container">
          <h1 className="main-heading">Popular</h1>

          {this.renderLanguageList()}

          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
