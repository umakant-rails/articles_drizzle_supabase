import { combineReducers } from "@reduxjs/toolkit";
import adminTagSlice from "./admin/adminTagSlice";

export default combineReducers({
  adminTags: adminTagSlice, 
});