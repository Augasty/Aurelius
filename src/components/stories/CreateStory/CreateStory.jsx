import { useState } from "react";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import styles from "../../tasks/createTask/styles.module.css";

import btn from "../../../sharedStyles/BigButtonStyle.module.css";

const CreateStory = () => {
  const { currentboard } = useProjectContexts();
  const [story, setstory] = useState({
    deadline: "9999-12-31",
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
        completionCount: 0,
      });

      console.log("story created", story);
    } catch (e) {
      console.error(e);
    }

    history("/");
  };



  

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

  return (
    <div className={styles.container}>
      <form className={styles.createstoryForm} onSubmit={handleSubmit}>
        <h5 className={styles.heading}>Create a New Story</h5>
        <label htmlFor="title">Story Title</label>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="title"
            className={styles.taskTitleInput}
            onChange={handleChange}
            required
          />
        </div>

        <div className={`${styles.inputContainer}`}>
          <label htmlFor="deadline">Deadline (optional)</label>
          <input
            type="date"
            id="deadline"
            className={`${styles.inputField} ${styles.taskTitleInput}`}
            onChange={handleChange}
            min={yesterday.toISOString().split("T")[0]}
            max="2999-12-31"
          />
        </div>

          <button
            className={btn.BigButton}
            type="submit"
          >
            Create Story
          </button>
      </form>
    </div>
  );
};

export default CreateStory;
