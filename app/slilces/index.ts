import { combineReducers } from "@reduxjs/toolkit";
import adminTagSlice from "./admin/adminTagSlice";
import adminAuthorSlice from "./admin/adminAuthorSlice";

export default combineReducers({
  adminTag: adminTagSlice,
  adminAuthor: adminAuthorSlice
});