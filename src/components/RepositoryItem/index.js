// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="repo-list">
      <img src={avatarUrl} alt={name} className="repo-image" />
      <h1>{name}</h1>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="icon"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="count">{starsCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
