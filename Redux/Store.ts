import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./UserSlice";

const Store = configureStore({
  reducer: {
    loggedUser: UserSlice.reducer,
  },
});

export default Store;