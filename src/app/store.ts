import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "../features/counter/CounterSlice";
import PostReducer from "../features/posts/PostSlice";
import UserReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    posts: PostReducer,
    users: UserReducer,
  },
});
