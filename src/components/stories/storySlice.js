import { createSlice } from "@reduxjs/toolkit"

const initialState = []


const storyslice = createSlice({
    name: 'stories',
    initialState,

    reducers: {
        setstoriesFromFireBase:(state,action)=>{
            return action.payload
        },
        // add single story
        addSinglestory:(state,action)=>{
            const newstory = action.payload;
            return [...state, newstory]
        }
    }
})

export const {setstoriesFromFireBase, addSinglestory} = storyslice.actions
export default storyslice.reducer