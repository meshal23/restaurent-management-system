import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "../features/posts/PostSlice";
import UserReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    posts: PostReducer,
    users: UserReducer,
  },
});
