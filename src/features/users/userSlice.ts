/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Meshal" },
  { id: "1", name: "Mark" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const allUsers = (state: any) => state.users;
export default usersSlice.reducer;
