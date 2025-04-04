import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Title 1",
    description: " Description One",
  },

  {
    id: "2",
    title: "Title 2",
    description: " Description Two",
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { createPost } = postSlice.actions;
export default postSlice.reducer;
