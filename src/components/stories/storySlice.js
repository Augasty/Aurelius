import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const storySlice = createSlice({
  name: "stories",
  initialState,

  reducers: {
    setStoriesFromFireBase: (state, action) => {
      return action.payload;
    },
  },
});

export const { setStoriesFromFireBase } = storySlice.actions;
export default storySlice.reducer;
