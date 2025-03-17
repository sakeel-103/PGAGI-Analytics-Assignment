import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FinanceState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: FinanceState = {
  data: null,
  loading: false,
  error: null,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    fetchFinanceStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFinanceSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchFinanceFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchFinanceStart, fetchFinanceSuccess, fetchFinanceFailure } =
  financeSlice.actions;
export default financeSlice.reducer;
