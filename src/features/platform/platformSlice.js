import { createSlice } from "@reduxjs/toolkit";

const platforms = [
  {
    name: "Facebook",
    icon: "📘",
    limit: 63206,
  },
  {
    name: "Twitter",
    icon: "🐦",
    limit: 280,
  },
  {
    name: "Instagram",
    icon: "📸",
    limit: 2200,
  },
  {
    name: "LinkedIn",
    icon: "💼",
    limit: 3000,
  },
];

const initialState = {
  currentPlatform: platforms[1],
  platforms,
};

const platformSlice = createSlice({
  name: "platform",

  initialState,

  reducers: {

    setPlatform(state, action) {

      const selected = state.platforms.find(
        (item) => item.name === action.payload
      );

      if (selected) {
        state.currentPlatform = selected;
      }

    },

  },

});

export const { setPlatform } = platformSlice.actions;

export default platformSlice.reducer;