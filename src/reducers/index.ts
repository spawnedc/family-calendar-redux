import { combineReducers } from "redux";
import { EventsReducer } from "./events-reducer";

export const allReducers = combineReducers({
  events: EventsReducer,
});
