/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

interface Post {
  id: string;
  title: any;
  description: any;
  date: any;
  userId: any;
  reactions: {
    thumbsUp: number;
    wow: number;
    coffee: number;
  };
}

const initialState: {
  posts: Post[];
  status: "idle" | "pending" | "succeed" | "failed";
  error: null | string;
} = {
  posts: [],
  status: "idle", //"idle", "pending", "succeed", "failed"
  error: null,
};

export const fetchedPosts = createAsyncThunk("posts/fetchedPosts", async () => {
  const response = await axios.get(API_URL);

  return response.data;
});

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
          reactions: any;
        }>
      ) {
        state.posts.push(action.payload);
      },
      prepare(title: any, description: any, userId: any) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              coffee: 0,
            },
          },
        };
      },
    },

    reactionAdded(
      state,
      action: PayloadAction<{
        postId: string;
        reaction: unknown;
      }>
    ) {
      const { postId, reaction } = action.payload;
      const reactedPost = state.posts.find((post) => post.id === postId);

      if (reactedPost) {
        reactedPost.reactions[
          reaction as keyof typeof reactedPost.reactions
        ] += 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchedPosts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchedPosts.fulfilled, (state, action) => {
        state.status = "succeed";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post: any) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchedPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const selectAllPosts = (state: any) => state.posts.posts;
export const getPostsStatus = (state: any) => state.posts.status;
export const getPostsError = (state: any) => state.posts.error;

export const { createPost, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
