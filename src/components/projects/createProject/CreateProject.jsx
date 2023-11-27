import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate} from 'react-router-dom';
import './CreateProject.module.css'; // Import your custom CSS file

import { v4 as uuid } from "uuid";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const CreateProject = () => {
  const [project, setProject] = useState({
    id: uuid(),
    title: '',
    content: '',
  });
  const [user] = useAuthState(auth);
  const curuser = auth.currentUser;

  useEffect(() => {

    console.log(curuser?.displayName)
  }, [curuser])
  const history = useNavigate();

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{

      const docRef = await addDoc(collection(db,"projects"),{
        title: project.title,
        content: project.content,
        authorName: curuser.displayName,
        createdAt: serverTimestamp()
      });
      console.log(docRef)
    }catch(e){
      console.error(e)
    }

    history('/');
  };

  // if (!auth.uid) return <Navigate to='/signin' />;

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="heading">Create a New Project</h5>
        <div className="input-field">
          <input type="text" id='title' onChange={handleChange} />
          <label htmlFor="title">Project Title</label>
        </div>
        <div className="input-field">
          <textarea id="content" className="custom-textarea" onChange={handleChange}></textarea>
          <label htmlFor="content">Project Content</label>
        </div>
        <div className="input-field">
          <button className="btn submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
