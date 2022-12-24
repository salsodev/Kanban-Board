import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: {
    currentCategory: "",
    theme: {
      isSwitch: false,
      lightTheme: "light",
    },
  },
  reducers: {
    addActiveCategory: (state, action) => {
      state.currentCategory = action.payload;
    },

    switchThemeButtonClick: (state) => {
      state.theme.isSwitch = !state.theme.isSwitch;
    },
  },
});

export const { addActiveCategory, switchThemeButtonClick } = slice.actions;

export default slice.reducer;
