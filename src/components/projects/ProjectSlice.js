import { createSlice } from '@reduxjs/toolkit'

import { db } from '../../firebase';



const projectsSlice = createSlice({
    name: 'projects',
    initialState:[],
    reducers: {
      getAllProjects: (state,action) => {
        return action.payload;
      },
      addProject: (state, action) => {
        const newProject = action.payload; 
        return [...state, newProject];
      },
    //   the action is the project ID
      getProjectById: (state, action) => {
        const projectId = action.payload; 
        if(state){
          return state.find(project => project.id === projectId) || null;
        }
      },
    },
  });

  // Async action to fetch projects from Firestore
export const fetchAllProjects = async (dispatch) => {
  try {
    const projectsCollection = await db.collection('projects').get()
    const projects = projectsCollection.docs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      content: doc.content,
      authorFirstName: doc.authorFirstName,
      authorLastName: doc.authorLastName,
      createdAt: doc.createdAt
    }));
    dispatch(getAllProjects(projects));
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

export const { getAllProjects, addProject, getProjectById } = projectsSlice.actions;
export default projectsSlice.reducer;