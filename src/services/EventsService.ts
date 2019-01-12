import { Moment } from "moment";
import { CalendarEvent } from "../classes/CalendarEvent";
import { DateFormats } from "../constants/DateFormats";
import { MomentDateUnits } from "../constants/MomentDateUnits";
import { GApiService } from "./GApiService";

interface IEventsCache {
  [key: string]: Promise<CalendarEvent[]>;
}

export class EventsService {
  public static async getDayEvents(day: Moment): Promise<CalendarEvent[]> {
    const events: CalendarEvent[] = await EventsService.getAllEventsForMonth(
      day,
    );
    return events.filter(
      (event) =>
        event.startDate && day.isSame(event.startDate, MomentDateUnits.DAY),
    );
  }

  public static async getAllEventsForMonth(
    selectedDate: Moment,
  ): Promise<CalendarEvent[]> {
    const monthKey: string = selectedDate.format(DateFormats.MONTH_WITH_YEAR);

    if (!EventsService.events[monthKey]) {
      const startDate: string = selectedDate
        .clone()
        .startOf(MomentDateUnits.MONTH)
        .toISOString();
      const endDate: string = selectedDate
        .clone()
        .endOf(MomentDateUnits.MONTH)
        .toISOString();

      EventsService.events[monthKey] = new Promise((resolve) => {
        GApiService.listUpcomingEvents(startDate, endDate).then(
          (events: CalendarEvent[]) => resolve(events),
        );
      });
    }

    return EventsService.events[monthKey];
  }

  private static events: IEventsCache = {};
}
