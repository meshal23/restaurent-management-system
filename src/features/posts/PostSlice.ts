/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { sub } from "date-fns";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: {
      reducer(
        state,
        action: PayloadAction<{
          id: any;
          title: string;
          content: string;
          userId: any;
          date: any;
          reactions: any;
        }>
      ) {
        state.posts.push(action.payload);
      },
      prepare(title: string, content: string, userId: any) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              like: 0,
              wow: 0,
              cry: 0,
            },
          },
        };
      },
    },

    addReaction(
      state,
      action: PayloadAction<{
        postId: number;
        reaction: keyof (typeof initialState.posts)[0]["reactions"];
      }>
    ) {
      const { postId, reaction } = action.payload;
      const reactedPost = state.posts.find((post) => post.id === postId);

      if (reactedPost) {
        reactedPost.reactions[reaction] += 1;
      }
    },
  },
});

export const allPosts = (state: any) => state.posts;
export const { createPost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
