import { Moment, utc } from "moment";
import React, { Component } from "react";
import { Calendar } from "../components/calendar/Calendar";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { CalendarViewTypes } from "../constants/CalendarViewTypes";
import { GApiService } from "../services/GApiService";
import "./app.css";

interface IAppState {
  currentView: CalendarViewTypes;
  selectedDate: Moment;
  signedIn: boolean;
  userProfile: gapi.auth2.BasicProfile | null;
}

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentView: CalendarViewTypes.MONTH,
      selectedDate: utc(new Date()),
      signedIn: false,
      userProfile: null,
    };
    this.signInHandler = this.signInHandler.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.viewChangeHandler = this.viewChangeHandler.bind(this);
    this.dateChangeHandler = this.dateChangeHandler.bind(this);
    GApiService.initialise(this.signInHandler, this.signOutHandler);
  }

  public render() {
    const { currentView, selectedDate, signedIn, userProfile } = this.state;

    if (!signedIn) {
      return "Signing in...";
    }

    return (
      <div className="app">
        <Header
          currentView={currentView}
          selectedDate={selectedDate}
          viewChangeHandler={this.viewChangeHandler}
          dateChangeHandler={this.dateChangeHandler}
          userProfile={userProfile}
        />
        <Sidebar currentView={currentView} selectedDate={selectedDate} />
        <Calendar currentView={currentView} selectedDate={selectedDate} />
      </div>
    );
  }

  private signInHandler(profile: gapi.auth2.BasicProfile): void {
    this.setState({
      signedIn: true,
      userProfile: profile,
    });
  }

  private signOutHandler(): void {
    this.setState({
      signedIn: false,
      userProfile: null,
    });
  }

  private viewChangeHandler(newView: CalendarViewTypes): void {
    this.setState({
      currentView: newView,
    });
  }

  private dateChangeHandler(newDate: Moment): void {
    this.setState({
      selectedDate: newDate,
    });
  }
}

export default App;
