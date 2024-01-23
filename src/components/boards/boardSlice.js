import { createSlice } from "@reduxjs/toolkit"

const initialState = {}


const boardSlice = createSlice({
    name: 'boards',
    initialState,

    reducers: {
        // add board
        setboardsFromFireBase:(state,action)=>{
            return action.payload
        }
    }
})

export const {setboardsFromFireBase } = boardSlice.actions
export default boardSlice.reducer