import { Actions } from "../constants/Actions";

export const CurrentUserReducer = (
  state: gapi.auth2.GoogleUser | null = null,
  action: any,
): gapi.auth2.GoogleUser | null => {
  switch (action.type) {
    case Actions.GAPI.USER_SIGNED_IN:
      return action.payload as gapi.auth2.GoogleUser;
  }

  return state;
};
