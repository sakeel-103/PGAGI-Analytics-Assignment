import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsState {
  data: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  data: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    fetchNewsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchNewsSuccess(state, action: PayloadAction<Article[]>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchNewsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.data = [];
    },
  },
});

export const { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure } =
  newsSlice.actions;
export default newsSlice.reducer;
