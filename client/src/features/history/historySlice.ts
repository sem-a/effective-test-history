import { History } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { historyApi } from "../../app/services/history"

interface InitialState {
  stocks: History[] | null;
}

const initialState: InitialState = {
  stocks: null,
};

const slice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      historyApi.endpoints.filterHistory.matchFulfilled,
      (state, action) => {
        state.stocks = action.payload;
      }
    );
  },
});

export default slice.reducer;
export const selectHistory = (state: RootState) => state.history;
