import { createSlice } from "@reduxjs/toolkit"

const initialState = []


const taskSlice = createSlice({
    name: 'tasks',
    initialState,

    reducers: {
        // add group
        setTasksFromFireBase:(state,action)=>{
            return action.payload
        },
        // add single task
        addSingleTask:(state,action)=>{
            const newTask = action.payload;
            return [...state, newTask]
        }
    }
})

export const {setTasksFromFireBase, addSingleTask} = taskSlice.actions
export default taskSlice.reducer