import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";

const makeStore = () => {
  return configureStore({
    reducer: {
      // Add other reducers here
      auth: authReducer,
    },
    // Optional: Add middleware or other config options
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Infer types from store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const store = makeStore();
