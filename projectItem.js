import './index.css'

const ProjectItem = props => {
  const {projectDetails} = props
  const {name, image_url: imageUrl} = projectDetails

  return (
    <li className="project-item">
      <img src={imageUrl} alt={name} className="project-image" />
      <p className="project-name">{name}</p>
    </li>
  )
}

export default ProjectItem
