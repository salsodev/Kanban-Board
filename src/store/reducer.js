import { combineReducers } from "@reduxjs/toolkit";
import entitiesReducer from "./entities";

const reducers = combineReducers({
  entities: entitiesReducer,
});

export default reducers;
