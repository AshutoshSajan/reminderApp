import { combineReducers } from "redux";
import auth from "./auth";
import students from "./students";
import payments from "./payments";
import reminder from "./reminder";

const rootReducer = combineReducers({
  auth,
  students,
  payments,
  reminder
});

export default rootReducer;
