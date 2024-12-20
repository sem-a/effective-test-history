import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { api } from "./services/api";
import history from "../features/history/historySlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    history,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
