// ProjectDetails.js

import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { fetchProjectData } from './singleProjectIdentifier.js';
import './ProjectDetails.css'
const ProjectDetails = () => {
//   const { auth, match } = props; 

// fetch the project to fetch from parameter,
// and fetch the auth with redux-toolkit

  const projectId = useParams()
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await fetchProjectData(2);
        setProject(projectData);
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
    return <div className="container center">{error}</div>;
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
