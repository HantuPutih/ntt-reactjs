import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/slices/authSlice";
import productReducer from "@/lib/slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

