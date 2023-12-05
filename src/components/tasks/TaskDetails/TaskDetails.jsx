import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase.js'; // Assuming you have a separate file for Firebase initialization
import TaskCard from './TaskCard.jsx';

const TaskDetails = () => {
  const projectId  = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectById = async (projectId) => {
      try {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log(docSnap.data())
          const projectData = {
            id: docSnap.id,
            title: docSnap.data().title,
            content: docSnap.data().content,
            authorName: docSnap.data().authorName,
            createdAt: docSnap.data().createdAt
 
          };
          setProject(projectData);
        } else {
          console.log('No such document!');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error getting document:', error);
        setLoading(false);
      }
    };

    fetchProjectById(projectId.id);
  }, [projectId]);

  if (loading) {
    return <div className="container center">Loading project...</div>;
  }

  if (project) {
    return <TaskCard
    
        title={project.title}
        content={project.content}
        authorName={project.authorName}
        createdAt={project.createdAt}
    />
  }
  

  return <div className="container center">Project not found.</div>;
};

export default TaskDetails
