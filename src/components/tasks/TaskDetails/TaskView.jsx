/* eslint-disable react/prop-types */

import moment from 'moment'
import './TaskDetails.module.css';

const TaskView = ({ currentTask}) => {
  if(!currentTask){
    return <>loading</>
  }
  return (
    <div className="task-details">
    <h2>{currentTask.title}</h2>
    <p><strong>Content:</strong> {currentTask.content}</p>
    <p><strong>Author:</strong> {currentTask?.authorDetails}</p>
    <p><strong>Created At:</strong> {currentTask.createdAt}</p>
    <p><strong>Assigned To:</strong> {currentTask.assignedTo}</p>
    <p><strong>Priority:</strong> {currentTask.priority}</p>
    <p><strong>Task Status:</strong> {currentTask.taskStatus}</p>
  </div>
  );
};

export default TaskView;
