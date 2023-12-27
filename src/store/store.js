import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../components/layout/boards/boardSlice'
import taskReducer from '../components/tasks/taskSlice'

const store = configureStore({
    reducer:{
        boards: boardReducer,
        tasks:taskReducer
    }
})

export default store