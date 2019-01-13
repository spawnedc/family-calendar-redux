import { CalendarEvent } from "../classes/CalendarEvent";

export const EventsReducer = (
  state: CalendarEvent[] = [],
  action: any,
): CalendarEvent[] => {
  switch (action.type) {
    case "EVENTS_UPDATED":
      return action.payload as CalendarEvent[];
  }

  return state;
};
