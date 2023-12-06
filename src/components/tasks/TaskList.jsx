/* eslint-disable react/prop-types */
import TaskSummary from './TaskSummary';
import { Link } from 'react-router-dom';
import './TaskList.css';
import { useSelector } from 'react-redux';


const TaskList = () => { 
  
  const reduxTasks = useSelector((state) => state.tasks);
  const filteredArray = reduxTasks.filter((obj) => !obj.dummy);
  return (
    <div >
      {filteredArray &&
        filteredArray?.map((task) => (
          task.id && <Link to={'/task/' + task.id} key={task.id}>
            <TaskSummary task={task} />
          </Link>
        ))}
    </div>
  );
};

export default TaskList;
