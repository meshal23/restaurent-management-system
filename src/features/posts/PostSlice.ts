/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: 1,
    title: "Title 1",
    content: " Content One",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      like: 0,
      wow: 0,
      cry: 0,
    },
  },

  {
    id: 2,
    title: "Title 2",
    content: " Content Two",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      like: 0,
      wow: 0,
      cry: 0,
    },
  },
];

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
        state.push(action.payload);
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
        reaction: keyof (typeof initialState)[0]["reactions"];
      }>
    ) {
      const { postId, reaction } = action.payload;
      const reactedPost = state.find((post) => post.id === postId);

      if (reactedPost) {
        reactedPost.reactions[reaction] += 1;
      }
    },
  },
});

export const allPosts = (state: any) => state.posts;
export const { createPost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
