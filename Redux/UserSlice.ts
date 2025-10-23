import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setLogginUser: (state, action) => {
    //   console.log(action.payload);
      return action.payload;
    },
    clearLoggedInUser: (state) => {
      state = null;
    },
  },
});

export const { setLogginUser, clearLoggedInUser } = UserSlice.actions;
export default UserSlice.reducer;