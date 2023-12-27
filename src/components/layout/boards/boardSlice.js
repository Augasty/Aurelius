import { createSlice } from "@reduxjs/toolkit"

const initialState = {}


const boardSlice = createSlice({
    name: 'boards',
    initialState,

    reducers: {
        // add board
        setboardsFromFireBase:(state,action)=>{
            return action.payload
        },
        // add single board, and make it the current board
        addSingleboard:(state,action)=>{
            const newboard = action.payload;
            return {
                ...state,
                ...newboard
            }
        }
    }
})

export const {setboardsFromFireBase, addSingleboard} = boardSlice.actions
export default boardSlice.reducer