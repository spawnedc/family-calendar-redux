import { CalendarEvent } from "../classes/CalendarEvent";

export class GApiService {
  public static async listUpcomingEvents(
    timeMin: string,
    timeMax: string,
  ): Promise<CalendarEvent[]> {
    await GApiService.gapi.client.load("calendar", "v3");

    const response: gapi.client.Response<
      gapi.client.calendar.Events
    > = await GApiService.gapi.client.calendar.events.list({
      calendarId: "#contacts@group.v.calendar.google.com",
      maxResults: 50,
      orderBy: "startTime",
      showDeleted: false,
      singleEvents: true,
      timeMax,
      timeMin,
    });

    const events = response.result.items || [];

    return events.map(CalendarEvent.fromGapiEvent);
  }

  public static async signOut() {
    await GApiService.gapi.auth2.getAuthInstance().signOut();
    GApiService.signOutHandler();
  }

  private static signInHandler: (profile: gapi.auth2.BasicProfile) => void;
  private static signOutHandler: () => void;

  private static gapi: any = gapi;
}
