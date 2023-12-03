import { createSlice } from "@reduxjs/toolkit"

const initialState = {}


const groupSlice = createSlice({
    name: 'groups',
    initialState,

    reducers: {
        // add grou
        setGroupsFromFireBase:(state,action)=>{
            return action.payload
        },
        getCurrentGroups:{},
        getAllGroups:{},

        // add single group, and make it the current group
        addSingleGroup:(state,action)=>{
            const newGroup = action.payload;
            return {
                ...state.groups,
                [newGroup.id]: newGroup.name
            }
        }
    }
})

export const {setGroupsFromFireBase, getCurrentGroups, getAllGroups, addSingleGroup} = groupSlice.actions
export default groupSlice.reducer