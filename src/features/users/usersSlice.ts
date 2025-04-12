/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

interface Users {
  id: string;
  name: string;
  username: string | null;
  email: string | null;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  } | null;
}

const initialState: {
  users: Users[];
  status: "idle" | "loading" | "succeed" | "failed";
  error: string | null;
} = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchedUsers = createAsyncThunk("users/fetchedUsers", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchedUsers.pending, (state, action) => {
        state.status === "loading";
      })
      .addCase(fetchedUsers.fulfilled, (state, action) => {
        state.status === "succeed";
        // get all users
        // console.log(state.users);
        // console.log(action.payload);
        state.users = action.payload;
      })
      .addCase(fetchedUsers.rejected, (state, action) => {
        state.status === "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const selectAllUsers = (state: any) => state.users.users;
export const getAllStatus = (state: any) => state.users.status;
export const getAllError = (state: any) => state.users.error;
export default usersSlice.reducer;
