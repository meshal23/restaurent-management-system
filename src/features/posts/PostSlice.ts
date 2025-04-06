/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Title 1",
    description: "Description One",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },

  {
    id: "2",
    title: "Title 2",
    description: " Description Two",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: {
      reducer(
        state,
        action: PayloadAction<{
          id: string;
          title: any;
          description: any;
          date: any;
          userId: any;
        }>
      ) {
        state.push(action.payload);
      },
      prepare(title: any, description: any, userId: any) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            date: new Date().toISOString(),
            userId,
          },
        };
      },
    },
  },
});

export const selectAllPosts = (state: any) => state.posts;

export const { createPost } = postSlice.actions;
export default postSlice.reducer;
