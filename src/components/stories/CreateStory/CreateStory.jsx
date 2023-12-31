import { useState } from "react";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import styles from "../../tasks/createTask/styles.module.css";

const CreateStory = () => {
  const { currentboard } = useProjectContexts();
  const [task, setTask] = useState({
    openToAll: false,
  });

  const curuser = auth.currentUser;
  const history = useNavigate();

  const handleChange = (e) => {
    setTask({
      // Updated variable name
      ...task, // Updated variable name
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(task);
    try {
      await addDoc(collection(db, "boards", currentboard[0], "storyList"), {
        ...task,
        authorDetails: curuser.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log("story created", task);
    } catch (e) {
      console.error(e);
    }

    history("/");
  };

  return (
    <div className={styles.container}>
      <form className={styles.createTaskForm} onSubmit={handleSubmit}>
        <h5 className={styles.heading}>Create a New Story</h5>
        <label htmlFor="title">Story Title</label>
        <div className={styles.inputField}>
          <input
            type="text"
            id="title"
            className={styles.taskTitleInput}
            onChange={handleChange}
            required
          />
        </div>

        <div className={`${styles.inputField}`}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            className={styles.prioritySelect}
            onChange={handleChange}
            required
          >
            <option value="Not Relevant">Not Relevant </option>
            <option value="Low Priority">Low</option>
            <option value="Medium Priority">Medium</option>
            <option value="High Priority">High</option>
          </select>
        </div>


        <div className={`${styles.inputField}`}>
          <label htmlFor="priority">Status</label>
          <select
            id="storyStatus"
            className={styles.prioritySelect}
            onChange={handleChange}
            required
          >
            <option value="Not Relevant">Not Relevant </option>
            <option value="Relevant">Relevant</option>
          </select>
        </div>
        <div className={`${styles.inputField}`}>
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            className={`${styles.deadlineInput}`}
            onChange={handleChange}
          />
        </div>

        <div className={`${styles.inputField}`}>
          <button
            className={`${styles.btn} ${styles.submit} ${styles.createTaskBtn}`}
            type="submit"
          >
            Create Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStory;
