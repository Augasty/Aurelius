import { createSlice } from "@reduxjs/toolkit"

const initialState = []


const NotificationSlice = createSlice({
    name: 'notifications',
    initialState,

    reducers: {
        setNotificationsFromFireBase:(state,action)=>{
            return action.payload
        }
    }
})

export const {setNotificationsFromFireBase} = NotificationSlice.actions
export default NotificationSlice.reducer