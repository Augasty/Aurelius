import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import TaskView from './TaskView';
import TaskChange from './TaskChange';

const TaskDetails = () => {
  const curTaskId = useParams();
  // console.log(curTaskId)
  const reduxTasks = useSelector((state) => state.tasks);
  // console.log(reduxTasks)
  const [currentTask, setcurrentTask] = useState({})

  useEffect(() => {
    const foundCurrentObj = reduxTasks.find(obj=>obj.id==curTaskId.id)
    setcurrentTask(foundCurrentObj)

  }, [curTaskId, currentTask, reduxTasks])
  

  if(!currentTask){
    return <>loading</>
  }

    // if user.mail == createdBy or assignedTo, and locked == false, goto taskchange
    return (
(!currentTask.locked ? <TaskChange currentTask={currentTask}/>:<TaskView currentTask={currentTask}/>)
  )}

export default TaskDetails
