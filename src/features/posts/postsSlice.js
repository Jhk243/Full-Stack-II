import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const saveDraftAsync = createAsyncThunk(
  "posts/saveDraftAsync",
  async (draft) => {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    return draft;
  }
);

const initialState = {
  drafts: [],
  published: 0,
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {

    deleteDraft(state, action) {
      state.drafts = state.drafts.filter(
        (item) => item.id !== action.payload
      );
    },

    updateDraft(state, action) {
      state.drafts = state.drafts.map((item) =>
        item.id === action.payload.id
          ? action.payload
          : item
      );
    },

    publishDraft(state, action) {

      state.drafts = state.drafts.filter(
        (item) => item.id !== action.payload
      );

      state.published++;

    },

    loadDrafts(state, action) {

      state.drafts = action.payload;

    },

  },

  extraReducers: (builder) => {

    builder

      .addCase(
        saveDraftAsync.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        saveDraftAsync.fulfilled,
        (state, action) => {

          state.loading = false;

          state.drafts.unshift(action.payload);

        }
      );

  },

});

export const {

  deleteDraft,

  updateDraft,

  publishDraft,

  loadDrafts,

} = postsSlice.actions;

export default postsSlice.reducer;