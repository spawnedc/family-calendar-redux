import { Actions } from "../constants/Actions";

export const GoogleAuthReducer = (
  state: gapi.auth2.GoogleAuth | null = null,
  action: any,
): gapi.auth2.GoogleAuth | null => {
  switch (action.type) {
    case Actions.GAPI.INITIALISED:
      return action.payload as gapi.auth2.GoogleAuth;
  }

  return state;
};
