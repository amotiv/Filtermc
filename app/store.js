import { configureStore } from "@reduxjs/toolkit";
import serverReducer from "../reducers/serverSlice";
import userReducer from "../reducers/userSlice";

export default configureStore({
  reducer: {
    server: serverReducer,
    user: userReducer,
  },
});
