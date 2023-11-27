import { configureStore } from '@reduxjs/toolkit'
import projectReducer from '../components/projects/ProjectSlice'
const store = configureStore({
    reducer:{
        projects: projectReducer
    }
})

export default store