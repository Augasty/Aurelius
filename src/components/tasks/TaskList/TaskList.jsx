/* eslint-disable react/prop-types */
import TaskSummary from '../TaskSummary';
import { Link } from 'react-router-dom';
import styles from './TaskList.module.css';
import { useSelector } from 'react-redux';
import { separateTasksByPriority } from './separatedTasks';
// import { useEffect } from 'react';


const TaskList = () => { 
  
  const reduxTasks = useSelector((state) => state.tasks);
  const filteredArray = reduxTasks.filter((obj) => !obj.dummy);

  // Separate tasks based on priority
  const filterType = 'priority'
  const filterParameters = ["Low Priority","Medium Priority","High Priority"]
  const separatedTasks = separateTasksByPriority(filteredArray,filterType,filterParameters);

  return (
    <div className={styles.taskList}>
    {separatedTasks.map((taskGroups,idx)=>(
      <div className={styles.taskColumn} key={idx}>
        <h2>{filterParameters[idx]}</h2>
        {taskGroups.map((task) => (
          <Link to={'/task/' + task.id} key={task.id}>
            <TaskSummary task={task} />
          </Link>
        ))}
      </div>
    ))
    }
    </div>
  );
};

export default TaskList;