import { combineReducers } from "@reduxjs/toolkit";
import UiSlice from "./features/ui/UiSlice";

const entitiesReducer = combineReducers({
  ui: UiSlice,
});

export default entitiesReducer;
