import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../components/layout/boards/boardSlice'
import taskReducer from '../components/tasks/taskSlice'
import storyReducer from '../components/stories/storySlice'
const store = configureStore({
    reducer:{
        boards: boardReducer,
        tasks:taskReducer,
        stories:storyReducer
    }
})

export default store