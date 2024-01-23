import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../components/boards/boardSlice'
import taskReducer from '../components/tasks/taskSlice'
import storyReducer from '../components/stories/storySlice'
import notificationReducer from '../components/notification/notificationSlice'

const store = configureStore({
    reducer:{
        boards: boardReducer,
        tasks:taskReducer,
        stories:storyReducer,
        notifications: notificationReducer
    }
})

export default store