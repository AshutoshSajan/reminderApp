import { combineReducers } from "redux";
import auth from "./auth";
import students from "./students";
import payments from "./payments";
import reminders from "./reminders";

const rootReducer = combineReducers({
  auth,
  students,
  payments,
  reminders
});

export default rootReducer;
