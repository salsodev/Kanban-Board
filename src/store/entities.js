import { combineReducers } from "@reduxjs/toolkit";
import filterSlice from "./features/filter/filterSlice";
import todoSlice from "./features/todo/todoSlice";
import UiSlice from "./features/ui/UiSlice";

const entitiesReducer = combineReducers({
  todo: todoSlice,
  categories: filterSlice,
  ui: UiSlice,
});

export default entitiesReducer;
