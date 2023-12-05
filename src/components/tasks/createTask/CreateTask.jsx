/* eslint-disable react/prop-types */
import { useState } from "react";

import "./CreateTask.module.css"; // Update your custom CSS file name

import { addDoc, collection} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSingleTask } from "../taskSlice";

const CreateTask = ({ currentGroup }) => {
  const [task, setTask] = useState(null); // Updated variable name
  const curuser = auth.currentUser;
  const history = useNavigate()
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setTask({ // Updated variable name
      ...task, // Updated variable name
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentGroupId = currentGroup.split(",")[0];
      const docRef = await addDoc(
        collection(db, "groups", currentGroupId, "taskList"),
        {
          title: task.title, // Updated variable name
          dummy: false,
          content: task.content, // Updated variable name
          authorName: curuser.displayName,
          createdAt: new Date().toISOString()
        }
      );

      dispatch(addSingleTask(task)) // Updated variable name
      console.log(docRef);
    } catch (e) {
      console.error(e);
    }

    history("/");
  };

  // if (!auth.uid) return <Navigate to='/signin' />;
  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="heading">Create a New Task</h5> {/* Updated heading */}
        <div className="input-field">
          <input type="text" id="title" onChange={handleChange} required />
          <label htmlFor="title">Task Title</label> {/* Updated label */}
        </div>
        <div className="input-field">
          <textarea
            id="content"
            className="custom-textarea"
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="content">Task Content</label> {/* Updated label */}
        </div>
        <div className="input-field">
          <button className="btn submit" type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
