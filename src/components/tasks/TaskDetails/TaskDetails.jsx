import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

const TaskDetails = () => {
  const curTaskId = useParams();
  console.log(curTaskId)
  const reduxTasks = useSelector((state) => state.tasks);
  console.log(reduxTasks)
  const [currentTask, setcurrentTask] = useState({})

  useEffect(() => {
    const foundCurrentObj = reduxTasks.find(obj=>obj.id==curTaskId.id)
    setcurrentTask(foundCurrentObj)
    console.log(foundCurrentObj)

  }, [curTaskId, currentTask, reduxTasks])
  


  return(
<div>crap</div>
  )}

export default TaskDetails
