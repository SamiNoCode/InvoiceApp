import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import invoiceReducer from "./features/invoice/invoiceSlice";
import themeReducer from "./features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: invoiceReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
