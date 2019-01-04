import { Moment, utc } from "moment";
import React, { Component } from "react";
import { CalendarEvent } from "../classes/CalendarEvent";
import { Calendar } from "../components/calendar/Calendar";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { CalendarViewTypes } from "../constants/CalendarViewTypes";
import { MomentDateUnits } from "../constants/MomentDateUnits";
import { GApiService } from "../services/GApiService";
import "./app.css";

interface IAppState {
  currentView: CalendarViewTypes;
  selectedDate: Moment;
  signedIn: boolean;
  events: CalendarEvent[];
}

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentView: CalendarViewTypes.MONTH,
      events: [],
      selectedDate: utc(new Date()),
      signedIn: false,
    };
    this.signInHandler = this.signInHandler.bind(this);
    this.viewChangeHandler = this.viewChangeHandler.bind(this);
    GApiService.initialise(this.signInHandler);
  }

  public render() {
    const { currentView, selectedDate, signedIn, events } = this.state;

    console.warn(events);

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
        <Calendar viewType={currentView} selectedDate={selectedDate} />
      </div>
    );
  }

  private signInHandler(): void {
    this.setState({ signedIn: true });
    const { selectedDate } = this.state;
    const startDate: string = selectedDate
      .clone()
      .startOf(MomentDateUnits.MONTH)
      .toISOString();
    const endDate: string = selectedDate
      .clone()
      .endOf(MomentDateUnits.MONTH)
      .toISOString();

    GApiService.listUpcomingEvents(startDate, endDate).then(
      (events: CalendarEvent[]) => {
        this.setState({ events });
      },
    );
  }

  private viewChangeHandler(newView: CalendarViewTypes) {
    this.setState({
      currentView: newView,
    });
  }
}

export default App;
