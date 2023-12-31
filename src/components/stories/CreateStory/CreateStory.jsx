import { useState } from "react";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import styles from "../../tasks/createTask/styles.module.css";

const CreateStory = () => {
  const { currentboard } = useProjectContexts();
  const [story, setstory] = useState({
    deadline:"9999-12-31"
  });

  const curuser = auth.currentUser;
  const history = useNavigate();

  const handleChange = (e) => {
    setstory({
      // Updated variable name
      ...story, // Updated variable name
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(story);
    try {
      await addDoc(collection(db, "boards", currentboard[0], "storyList"), {
        ...story,
        authorDetails: curuser.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log("story created", story);
    } catch (e) {
      console.error(e);
    }

    history("/");
  };

  return (
    <div className={styles.container}>
      <form className={styles.createstoryForm} onSubmit={handleSubmit}>
        <h5 className={styles.heading}>Create a New Story</h5>
        <label htmlFor="title">Story Title</label>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="title"
            className={styles.inputField}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            className={`${styles.inputField}  ${styles.additionalInputStyles}`}
            onChange={handleChange}
            required
          >
          <option value=""> </option>
            <option value="Not Relevant">Not Relevant</option>
            <option value="Low Priority">Low</option>
            <option value="Medium Priority">Medium</option>
            <option value="High Priority">High</option>
          </select>
        </div>


        <div className={`${styles.inputContainer}`}>
          <label htmlFor="storyStatus">Status</label>
          <select
            id="storyStatus"
            className={`${styles.inputField}  ${styles.additionalInputStyles}`}
            onChange={handleChange}
            required
          >
          <option value=""></option>
            <option value="Not Relevant">Not Relevant </option>
            <option value="Relevant">Relevant</option>
          </select>
        </div>
        <div className={`${styles.inputContainer}`}>
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            className={`${styles.inputField}  ${styles.additionalInputStyles}`}
            onChange={handleChange}
          />
        </div>

        <div className={`${styles.inputContainer}`}>
          <button
            className={`${styles.btn} ${styles.submit} ${styles.createstoryBtn}`}
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
