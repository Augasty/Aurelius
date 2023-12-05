/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import styles from "./styles.module.css"; // Update your custom CSS file name

import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSingleTask } from "../taskSlice";
// import MultiSelect from "./MultiSelect";

const CreateTask = ({ currentGroup }) => {
  const [task, setTask] = useState({}); // Updated variable name
  const [currentGroupMails,setCurrentGroupMails] = useState([])




  const curuser = auth.currentUser;
  const history = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    try{

      const fetchUsersFromCurrentGroup = async () =>{
        const groupId = currentGroup.split(",")[0];
        const groupDocRef = doc(db, "groups", groupId);
        const groupDocSnap = await getDoc(groupDocRef);
  
        const groupCurrdata = groupDocSnap.data();
        const existingMails = [...groupCurrdata.memberEmails]
        setCurrentGroupMails(existingMails)
      }

      fetchUsersFromCurrentGroup()
    }catch(e){
      console.warn('error in fetching existing members while creating a task',e)
    }

  }, [currentGroup])
  
  const handleChange = (e) => {
    setTask({
      // Updated variable name
      ...task, // Updated variable name
      [e.target.id]: e.target.value,
    });
    console.log('bleh')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentGroupId = currentGroup.split(",")[0];
      const docRef = await addDoc(
        collection(db, "groups", currentGroupId, "taskList"),
        {
          title: task.title, // Updated variable name
          content: task.content, // Updated variable name
          authorDetails: [curuser.displayName, curuser.email],
          createdAt: new Date().toISOString(),
          // assignedTo: [...task.assignedTo],
          assignedTo: task.assignedTo,
          priority: task.priority,
          taskStatus: task.status,
          locked: false,
          dummy: false,
        }
      );
        
      dispatch(addSingleTask(task)); // Updated variable name
      console.log(docRef);
    } catch (e) {
      console.error(e);
    }

    history("/");
  };

  // if (!auth.uid) return <Navigate to='/signin' />;

  return (
    <div className={styles.container}>
      <form className={`${styles.white} ${styles.createTaskForm}`} onSubmit={handleSubmit}>
        <h5 className={styles.heading}>Create a New Task</h5>
        <label htmlFor="title">Task Title</label>
        <div className={styles.inputField}>
          <input
            type="text"
            id="title"
            className={`${styles.taskTitleInput}`}
            onChange={handleChange}
            required
          />
        </div>
        <label htmlFor="content">Task Content</label>
        <div className={`${styles.inputField}`}>
          <textarea
            id="content"
            className={`${styles.customTextarea} ${styles.taskContentTextarea}`}
            onChange={handleChange}
            required
          ></textarea>
        </div>
  
        <select
          id="assignedTo"
          className={`${styles.assignedToSelect}`}
          value={task.assignedTo || ''}
          onChange={handleChange}
        >
          {currentGroupMails.map((mail) => (
            <option value={mail} key={mail}>
              {mail}
            </option>
          ))}
        </select>
  
        <div className={`${styles.inputField}`}>
          <label htmlFor="priority">Priority</label>
          <select id="priority" className={`${styles.prioritySelect}`} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className={`${styles.inputField}`}>
          <label htmlFor="taskStatus">Task Status</label>
          <select
            id="taskStatus"
            className={`${styles.taskStatusSelect}`}
            onChange={handleChange}
          >
            <option value="new">New</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className={`${styles.inputField}`}>
          <button className={`${styles.btn} ${styles.submit} ${styles.createTaskBtn}`} type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
