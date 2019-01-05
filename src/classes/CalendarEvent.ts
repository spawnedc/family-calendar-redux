import { Moment, utc } from "moment";

export class CalendarEvent {
  public static fromGapiEvent(gapiEvent: gapi.client.calendar.Event) {
    const { id, summary, location, start, end } = gapiEvent;
    const eventId = id || "";
    const title = summary || "";
    const eventLocation = location || null;
    const startDate = CalendarEvent.parseGapiDate(start);
    const endDate = CalendarEvent.parseGapiDate(end);

    return new CalendarEvent(eventId, title, startDate, endDate, eventLocation);
  }

  private static parseGapiDate(
    date: gapi.client.calendar.EventDateTime | undefined,
  ): Moment | null {
    const dateStringToUse: string | undefined = date
      ? date.dateTime || date.date
      : undefined;

    const momentDate: Moment = utc(dateStringToUse);

    if (momentDate.isValid()) {
      return momentDate;
    }

    return null;
  }
  public startDate: Moment | null;
  public endDate: Moment | null;
  public id: string;
  public title: string;
  public location: string | null;

  constructor(
    id: string,
    title: string,
    startDate: Moment | null,
    endDate: Moment | null,
    location: string | null,
  ) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
  }
}
