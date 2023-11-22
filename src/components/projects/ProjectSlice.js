import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import fakeProjects from '../fakeProjects'

const initialState = [
    ...fakeProjects
]


const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
      getAllProjects: (state) => {
        return state;
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

export const { getAllProjects, addProject, getProjectById } = projectsSlice.actions;
export default projectsSlice.reducer;