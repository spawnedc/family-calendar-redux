import { Moment, utc } from "moment";

export class CalendarEvent {
  public static fromGapiEvent(gapiEvent: gapi.client.calendar.Event) {
    const { summary, location, start, end } = gapiEvent;
    const title = summary || "";
    const eventLocation = location || null;
    const startDate = CalendarEvent.parseDate(start);
    const endDate = CalendarEvent.parseDate(end);

    return new CalendarEvent(title, startDate, endDate, eventLocation);
  }

  private static parseDate(
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
  public title: string;
  public location: string | null;

  constructor(
    title: string,
    startDate: Moment | null,
    endDate: Moment | null,
    location: string | null,
  ) {
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
  }
}
