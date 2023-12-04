/* eslint-disable react/prop-types */

import moment from 'moment'
import './ProjectDetails.module.css';

const ProjectCard = ({ title, content, authorName, createdAt }) => {
  return (
    <div className="project-card">
      <h2 className="project-title">{title}</h2>
      <p className="project-content">{content}</p>
      <div className="project-details">
        <p className="author">Author: {authorName}</p>
        <p className="created-at">{moment(createdAt.toDate()).calendar()}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
