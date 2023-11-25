import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Navigate , useNavigate} from 'react-router-dom';
import './CreateProject.module.css'; // Import your custom CSS file
import { useDispatch } from 'react-redux';


const CreateProject = () => {
  const [project, setProject] = useState({
    title: '',
    content: '',
  });

  const dispatch = useDispatch();
  // const auth = useSelector((state) => state.firebase.auth);
  const history = useNavigate();

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(project));

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
