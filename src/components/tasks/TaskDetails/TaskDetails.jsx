/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import TaskView from './TaskView/TaskView';
import TaskChange from './TaskChange/TaskChange';
import { auth } from '../../../firebase';

const TaskDetails = () => {

  const curTaskId = useParams();
  const reduxTasks = useSelector((state) => state.tasks);
  const [currentTask, setcurrentTask] = useState({})

  const curuser = auth.currentUser;

  const [changePossible, setchangePossible] = useState(false)

  useEffect(() => {
    if (curuser?.email){

      const foundCurrentObj = reduxTasks.find(obj=>obj.id==curTaskId.id)
      setcurrentTask(foundCurrentObj)
  
      const changePossibleLogic = (( foundCurrentObj?.assignedTo == curuser.email || foundCurrentObj?.authorDetails == curuser.email  || foundCurrentObj?.openToAll ) && (  foundCurrentObj.lockedTill < new Date().toISOString() || foundCurrentObj?.lockedBy == curuser.email))
      setchangePossible(changePossibleLogic)
      
      console.log(changePossibleLogic)
    }

  }, [changePossible, curTaskId, currentTask, curuser?.email, reduxTasks])
  

  if(!currentTask){
    return <>loading</>
  }

    return (auth ?
(changePossible ? <TaskChange currentTask={currentTask}/>:<TaskView currentTask={currentTask}/>):<></>
  )}

export default TaskDetails
