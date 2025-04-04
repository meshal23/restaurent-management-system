import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "../features/counter/CounterSlice";
import PostReducer from "../features/PostList/PostSlice";

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    posts: PostReducer,
  },
});
