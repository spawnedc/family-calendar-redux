import { combineReducers } from "redux";
import { CurrentUserReducer } from "./reducer-current-user";
import { EventsReducer } from "./reducer-events";
import { GoogleAuthReducer } from "./reducer-google-auth";

export const allReducers = combineReducers({
  currentUser: CurrentUserReducer,
  events: EventsReducer,
  googleAuth: GoogleAuthReducer,
});
