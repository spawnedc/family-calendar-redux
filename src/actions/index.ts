import { CalendarEvent } from "../classes/CalendarEvent";

export const updateEvents = (newEvents: CalendarEvent[]) => {
  return {
    payload: newEvents,
    type: "EVENTS_UPDATED",
  };
};
