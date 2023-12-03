import { configureStore } from '@reduxjs/toolkit'
import groupReducer from '../components/layout/groups/groupSlice'

const store = configureStore({
    reducer:{
        groups: groupReducer
    }
})

export default store