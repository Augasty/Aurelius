/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import TaskView from './TaskView/TaskView';
import TaskChange from './TaskChange/TaskChange';
import { auth } from '../../../firebase';
import { useGroupContext } from '../../layout/navbar/GroupContext';

const TaskDetails = () => {
  const { currentGroup, setcurrentGroup } = useGroupContext();
  const curTaskId = useParams();
  const reduxTasks = useSelector((state) => state.tasks);
  const [currentTask, setcurrentTask] = useState({})

  const curuser = auth.currentUser;

  const [changePossible, setchangePossible] = useState(false)

  useEffect(() => {
    const foundCurrentObj = reduxTasks.find(obj=>obj.id==curTaskId.id)
    setcurrentTask(foundCurrentObj)

    const changePossibleLogic = ( foundCurrentObj?.assignedTo == curuser.email || foundCurrentObj?.authorDetails == curuser.email )

    setchangePossible(changePossibleLogic)
    // console.log(changePossible,foundCurrentObj,curuser.email)

  }, [changePossible, curTaskId, currentTask, curuser.email, reduxTasks])
  

  if(!currentTask){
    return <>loading</>
  }

    // if user.mail == createdBy or assignedTo, and locked == false, goto taskchange
    return (
(changePossible ? <TaskChange currentTask={currentTask} currentGroup={currentGroup} />:<TaskView currentTask={currentTask}/>)
  )}

export default TaskDetails
