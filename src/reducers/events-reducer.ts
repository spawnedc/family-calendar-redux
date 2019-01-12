import { CalendarEvent } from "../classes/CalendarEvent";

export const EventsReducer = (
  state: CalendarEvent[] = [],
  action: any,
): CalendarEvent[] => {
  console.warn(state, action);
  switch (action.type) {
    case "EVENTS_UPDATED":
      return action.payload as CalendarEvent[];
  }

  return state;
};
