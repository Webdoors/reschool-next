import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./auth/auth-slice";
import coursesReducer from "./courses/courses.slice";
import adminReducer from "./admin/admin-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      coursesState: coursesReducer,
      admin: adminReducer,
    },
  });
};

// Types needed for usage
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type StateDispatch = AppDispatch;

// Hook to use dispatch
export const useStateDispatch = () => useDispatch<AppDispatch>();
