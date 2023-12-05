/* eslint-disable react/prop-types */
import TaskSummary from './TaskSummary';
import { Link } from 'react-router-dom';
import './TaskList.css';


const TaskList = ({ tasks }) => { // Updated component name and prop name
  const filteredArray = tasks.filter((obj) => !obj.dummy);
  return (
    <div className="task-list section"> {/* Updated class name */}
      {filteredArray &&
        filteredArray?.map((task) => (
          <Link to={'/task/' + task.id} key={task.id} className="task-link"> {/* Updated to '/task/' */}
            <TaskSummary task={task} /> {/* Updated component name and prop name */}
          </Link>
        ))}
    </div>
  );
};

export default TaskList;