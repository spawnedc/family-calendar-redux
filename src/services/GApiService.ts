import { CalendarEvent } from "../classes/CalendarEvent";
import {
  api_key as apiKey,
  scopes as scope,
  web as credentials,
} from "../client_id.json";

export class GApiService {
  public static initialise(
    signInHandler: (profile: gapi.auth2.BasicProfile) => void,
    signOutHandler: () => void,
  ) {
    GApiService.signInHandler = signInHandler;
    GApiService.signOutHandler = signOutHandler;
    GApiService.gapi.load("client:auth2", () => GApiService.gapiLoadHandler());
  }

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

  private static updateSigninStatus(isSignedIn: boolean): void {
    if (isSignedIn) {
      const profile: gapi.auth2.BasicProfile = GApiService.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile();
      GApiService.signInHandler(profile);
    }
  }

  private static loadApi(apiName: string, apiVersion: string): Promise<void> {
    return new Promise((resolve) => {
      gapi.client.load(apiName, apiVersion, resolve);
    });
  }

  private static async gapiLoadHandler(): Promise<void> {
    try {
      await GApiService.gapi.client.init({
        apiKey,
        clientId: credentials.client_id,
        scope,
      });

      // Listen for sign-in state changes.
      GApiService.gapi.auth2
        .getAuthInstance()
        .isSignedIn.listen((isSignedIn: boolean) =>
          GApiService.updateSigninStatus(isSignedIn),
        );

      const alreadySignedIn: boolean = GApiService.gapi.auth2
        .getAuthInstance()
        .isSignedIn.get();

      if (alreadySignedIn) {
        // Handle the initial sign-in state.
        GApiService.updateSigninStatus(alreadySignedIn);
      } else {
        GApiService.gapi.auth2.getAuthInstance().signIn();
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}
