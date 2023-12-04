/* eslint-disable react/prop-types */
import moment from 'moment';



const ProjectSummary = ({ project }) => {

  const createdAtMoment = moment(project.createdAt);
  const isToday = createdAtMoment.isSame(moment(), 'day');
  const isYesterday = createdAtMoment.isSame(moment().subtract(1, 'day'), 'day');

  let formattedDate;

  if (isToday) {
    formattedDate = `Today at ${createdAtMoment.format('h:mm a')}`;
  } else if (isYesterday) {
    formattedDate = `Yesterday at ${createdAtMoment.format('h:mm a')}`;
  } else {
    formattedDate = createdAtMoment.format('MMMM Do YYYY [at] h:mm a');
  }







  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{project.title}</span>
        <p>Posted by {project.authorName}</p>
        <p className="grey-text">{formattedDate}</p>
      </div>
    </div>
  );
};

export default ProjectSummary;
