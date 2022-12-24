import { createSlice } from "@reduxjs/toolkit";

let nextID = 1;

const slice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    categoryAdded: (categories, action) => {
      categories.push({
        id: nextID++,
        description: action.payload.description,
      });
    },

    categoryRemoved: (categories, action) => {
      const index = categories.findIndex(
        (category) => category.id === action.payload.id
      );
      categories.splice(index, 1);
    },

    categoryRemovedAll: (categories) => {
      categories.splice(0, categories.length);
    },
  },
});

export const { categoryAdded, categoryRemoved, categoryRemovedAll } =
  slice.actions;

export default slice.reducer;

export const getActiveCategory = (categories, id) =>
  categories.find((category) => category.id === id);
