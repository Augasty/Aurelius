import { createSlice } from "@reduxjs/toolkit"

const initialState = {}


const groupSlice = createSlice({
    name: 'groups',
    initialState,

    reducers: {
        setGroupsWhileLoggingIn:(state,action)=>{
            return action.payload
        },
        getCurrentGroups:{},
        getAllGroups:{},

        // add single group, and make it the current group
        addSingleGroup:{}
    }
})

export const {setGroupsWhileLoggingIn, getCurrentGroups, getAllGroups, addSingleGroup} = groupSlice.actions
export default groupSlice.reducer