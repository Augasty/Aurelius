// ProjectDetails.js

import { useEffect,  useState } from "react";

import { useParams } from "react-router-dom";
import "./ProjectDetails.css";
import fakeProjects from "../../fakeProjects.js";




const ProjectDetails = () => {
  //   const { auth, match } = props;
  const projectId = useParams();



  // const [project,setProject] = useState(useSelector(state => getProjectById(state, projectId)))
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const project = fakeProjects[0]
  // use async when firebase is implemented
  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  //   if (!auth.uid) return <Redirect to='/signin' />;

  if (loading) {
    return <div className="container center">Loading project...</div>;
  }

  if (error) {
    return <div className="container center">{error}x</div>;
  }

  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ProjectDetails;
