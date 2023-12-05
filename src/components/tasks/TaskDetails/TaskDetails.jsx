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
  



    return (
      <div className="task-details">
        <h2>{currentTask.title}</h2>
        <p><strong>Content:</strong> {currentTask.content}</p>
        <p><strong>Author:</strong> {currentTask?.authorDetails}</p>
        <p><strong>Created At:</strong> {currentTask.createdAt}</p>
        <p><strong>Assigned To:</strong> {currentTask.assignedTo}</p>
        <p><strong>Priority:</strong> {currentTask.priority}</p>
        <p><strong>Task Status:</strong> {currentTask.taskStatus}</p>
        <p><strong>Locked:</strong> {currentTask.locked ? 'Yes' : 'No'}</p>
        <p><strong>Dummy:</strong> {currentTask.dummy ? 'Yes' : 'No'}</p>
      </div>
  )}

export default TaskDetails
