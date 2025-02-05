import { combineReducers } from "@reduxjs/toolkit";
import { reducer as organizationReducer } from "src/slices/organization";
import { reducer as nameReducer } from "src/slices/name";
import { reducer as userReducer } from "src/slices/user";

const rootReducer = combineReducers({
  organization: organizationReducer,
  name: nameReducer,
  user: userReducer,
});

export default rootReducer;
