import { Actions } from "../constants/Actions";

export const gapiInitialised = (gapiAuth: gapi.auth2.GoogleAuth) => ({
  payload: gapiAuth,
  type: Actions.GAPI.INITIALISED,
});

export const gapiUserSignedIn = (user: gapi.auth2.GoogleUser) => ({
  payload: user,
  type: Actions.GAPI.USER_SIGNED_IN,
});
