import { createSlice } from "@reduxjs/toolkit"

const initialState = []


const taskSlice = createSlice({
    name: 'tasks',
    initialState,

    reducers: {
        setTasksFromFireBase:(state,action)=>{
            return action.payload
        }
    }
})

export const {setTasksFromFireBase, addSingleTask} = taskSlice.actions
export default taskSlice.reducer