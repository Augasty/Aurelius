/* eslint-disable react/prop-types */
import { useState } from "react";

import "./CreateProject.module.css"; // Import your custom CSS file

import { addDoc, collection} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSingleTask } from "../taskSlice";

const CreateProject = ({ currentGroup }) => {
  const [project, setProject] = useState(null);
  const curuser = auth.currentUser;
  const history = useNavigate()
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setProject({
      ...project,
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
          title: project.title,
          dummy: false,
          content: project.content,
          authorName: curuser.displayName,
          createdAt: new Date().toISOString()
        }
      );

      dispatch(addSingleTask(project))
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
        <h5 className="heading">Create a New Project</h5>
        <div className="input-field">
          <input type="text" id="title" onChange={handleChange} required />
          <label htmlFor="title">Project Title</label>
        </div>
        <div className="input-field">
          <textarea
            id="content"
            className="custom-textarea"
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="content">Project Content</label>
        </div>
        <div className="input-field">
          <button className="btn submit" type="submit">Create</button>
        </div>
      </form>
    </div>
  );
  
};

export default CreateProject;
