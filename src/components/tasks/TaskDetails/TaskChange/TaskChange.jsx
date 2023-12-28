/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "./TaskChange.module.css";
import { useProjectContexts } from "../../../../utils/ProjectContexts";

const TaskChange = ({ currentTask }) => {
  const {currentboard} = useProjectContexts();
  const currentTaskRef = doc(db,"boards",currentboard[0],"taskList",currentTask?.id);
  const curuser = auth.currentUser;
  
  const [formData, setFormData] = useState({
    ...currentTask
  });
  const history = useNavigate();

  // Function to log 'hello world' every minute
  const updateLockedTill = async() => {
    console.log('hello world');
    await updateDoc(currentTaskRef, {
      ...currentTask,
      ...formData,
      lockedTill:new Date(new Date().getTime() + 10000).toISOString(),
      lockedBy: curuser?.email
    });
  };

  // useEffect to log 'hello world' on component loading and set up interval
  useEffect(() => {
    if(currentboard.lenght !==0){
    try{

      updateLockedTill(); // Log on component loading
  
      const intervalId = setInterval(updateLockedTill, 2000); // Log every 10sec
  
      return () => clearInterval(intervalId); // Clean up interval on component unmount
    }
    catch(error){
      console.warn('error in taskchange',error)
    }
  }
  }, [auth]); // Empty dependency array to run the effect only once on component mounting





  // Function to handle form changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(currentTaskRef, {
      ...currentTask,
      ...formData,
      lockedBy:null,
      lockedTill:new Date().toISOString(),
    });
    history("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>{formData.title}</h2>
        <label htmlFor="title" className={styles.label}>
          Task Title
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>

        <label htmlFor="content" className={styles.label}>
          Task Content
          <textarea
            id="content"
            value={formData.content}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </label>

        <label htmlFor="createdAt" className={styles.label}>
          Deadline
          <input
            type="text"
            id="createdAt"
            value={formData.deadline}
            onChange={handleChange}
            readOnly
            className={styles.input}
          />
        </label>



        <label htmlFor="priority" className={styles.label}>
          Priority
          <select
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label htmlFor="taskStatus" className={styles.label}>
          Task Status
          <select
            id="taskStatus"
            value={formData.taskStatus}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="new">New</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default TaskChange;
