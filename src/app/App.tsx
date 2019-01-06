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
}

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentView: CalendarViewTypes.MONTH,
      selectedDate: utc(new Date()),
      signedIn: false,
    };
    this.signInHandler = this.signInHandler.bind(this);
    this.viewChangeHandler = this.viewChangeHandler.bind(this);
    GApiService.initialise(this.signInHandler);
  }

  public render() {
    const { currentView, selectedDate, signedIn } = this.state;

    if (!signedIn) {
      return "Signing in...";
    }

    return (
      <div className="app">
        <Header
          currentView={currentView}
          selectedDate={selectedDate}
          viewChangeHandler={this.viewChangeHandler}
        />
        <Sidebar currentView={currentView} selectedDate={selectedDate} />
        <Calendar currentView={currentView} selectedDate={selectedDate} />
      </div>
    );
  }

  private signInHandler(): void {
    this.setState({ signedIn: true });
  }

  private viewChangeHandler(newView: CalendarViewTypes) {
    this.setState({
      currentView: newView,
    });
  }
}

export default App;
