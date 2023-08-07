import {createSlice} from "@reduxjs/toolkit";

const token = localStorage.getItem("token") || null;

const tokenSlice = createSlice({
  name: "token",
  initialState: token,
  reducers: {
    setToken: (state, action) => {
      state = action.payload;
    },
  },
});

export const {setToken} = tokenSlice.actions;
export default tokenSlice.reducer;
