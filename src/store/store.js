import { configureStore } from '@reduxjs/toolkit'
import groupReducer from '../components/layout/groups/groupSlice'
import taskReducer from '../components/projects/taskSlice'

const store = configureStore({
    reducer:{
        groups: groupReducer,
        tasks:taskReducer
    }
})

export default store