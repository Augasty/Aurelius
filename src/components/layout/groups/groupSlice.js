import { createSlice } from "@reduxjs/toolkit"

const initialState = {}


const groupSlice = createSlice({
    name: 'groups',
    initialState,

    reducers: {
        // add group
        setGroupsFromFireBase:(state,action)=>{
            return action.payload
        },
        // add single group, and make it the current group
        addSingleGroup:(state,action)=>{
            const newGroup = action.payload;
            return {
                ...state,
                ...newGroup
            }
        }
    }
})

export const {setGroupsFromFireBase, addSingleGroup} = groupSlice.actions
export default groupSlice.reducer