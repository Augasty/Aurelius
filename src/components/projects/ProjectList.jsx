/* eslint-disable react/prop-types */
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';
import './ProjectList.css';

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list section">
      {projects &&
        projects?.map((project) => (
          <Link to={'/project/' + project.id} key={project.id} className="project-link">
            <ProjectSummary key={project.id} project={project} />
          </Link>
        ))}
    </div>
  );
};

export default ProjectList;
