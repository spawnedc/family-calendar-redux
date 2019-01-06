import React from "react";
import { GApiService } from "../../../services/GApiService";
import "./user-info.css";

interface IUserInfoProps {
  profile: gapi.auth2.BasicProfile;
}

export class UserInfo extends React.Component<IUserInfoProps> {
  constructor(props: IUserInfoProps) {
    super(props);
    this.signoutClickHandler = this.signoutClickHandler.bind(this);
  }

  public render() {
    const { profile } = this.props;
    const imageUrl = profile.getImageUrl();
    const userName = profile.getName();

    return (
      <div className="user-info">
        <button className="sign-out-button" onClick={this.signoutClickHandler}>
          Sign out
        </button>
        <img className="user-image" src={imageUrl} />
      </div>
    );
  }

  private signoutClickHandler() {
    GApiService.signOut();
  }
}
