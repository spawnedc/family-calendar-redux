import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { gapiInitialised, gapiUserSignedIn } from "../actions/actions-gapi";
import { scopes, web as credentials } from "../client_id.json";

interface IGapiLoaderProps {
  gapiInitialised: any;
  gapiUserSignedIn: any;
  googleAuth: gapi.auth2.GoogleAuth;
}

class GapiLoader extends React.Component<IGapiLoaderProps> {
  public componentDidMount() {
    gapi.load("client:auth2", () => this.initialiseGapi());
  }

  public render() {
    if (this.props.googleAuth) {
      return "signing in...";
    }

    return "Initialising...";
  }

  private initialiseGapi() {
    const clientConfig: gapi.auth2.ClientConfig = {
      client_id: credentials.client_id,
      scope: scopes,
    };

    gapi.auth2.init(clientConfig).then((googleAuth: gapi.auth2.GoogleAuth) => {
      this.props.gapiInitialised(googleAuth);
      googleAuth.signIn().then((user: gapi.auth2.GoogleUser) => {
        this.props.gapiUserSignedIn(user);
      });
    });
  }
}

const mapStateToProps = (state: any) => ({ googleAuth: state.googleAuth });

const matchDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ gapiInitialised, gapiUserSignedIn }, dispatch);
};

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(GapiLoader);
