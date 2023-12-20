/* eslint-disable react/prop-types */
import TaskSummary from './TaskSummary';
import { Link } from 'react-router-dom';
import styles from './TaskList.module.css';
import { useSelector } from 'react-redux';
// import { useEffect } from 'react';


const TaskList = () => { 
  
  const reduxTasks = useSelector((state) => state.tasks);



  console.log(reduxTasks)
  // Separate tasks based on priority
  const highPriorityTasks = reduxTasks.filter(task => task.priority === 'high');
  const mediumPriorityTasks = reduxTasks.filter(task => task.priority === 'medium');
  const lowPriorityTasks = reduxTasks.filter(task => task.priority === 'low');

  return (
    <div className={styles.taskList}>
      <div className={styles.taskColumn}>
        <h2>High Priority</h2>
        {highPriorityTasks.map((task) => (
          <Link to={'/task/' + task.id} key={task.id}>
            <TaskSummary task={task} />
          </Link>
        ))}
      </div>

      <div className={styles.taskColumn}>
        <h2>Medium Priority</h2>
        {mediumPriorityTasks.map((task) => (
          <Link to={'/task/' + task.id} key={task.id}>
            <TaskSummary task={task} />
          </Link>
        ))}
      </div>
      <div className={styles.taskColumn}>
        <h2>Low Priority</h2>
        {lowPriorityTasks.map((task) => (
          <Link to={'/task/' + task.id} key={task.id}>
            <TaskSummary task={task} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
