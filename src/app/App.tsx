import { Moment, utc } from "moment";
import React, { Component } from "react";
import { Calendar } from "../components/calendar/Calendar";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { CalendarViewTypes } from "../constants/CalendarViewTypes";
import "./app.css";

interface IAppState {
  currentView: CalendarViewTypes;
  selectedDate: Moment;
}

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentView: CalendarViewTypes.MONTH,
      selectedDate: utc(new Date()),
    };
    this.onViewChanged = this.onViewChanged.bind(this);
  }

  public render() {
    const { currentView, selectedDate } = this.state;

    return (
      <div className="app">
        <Header
          currentView={currentView}
          selectedDate={selectedDate}
          onViewChanged={this.onViewChanged}
        />
        <Sidebar currentView={currentView} selectedDate={selectedDate} />
        <Calendar viewType={currentView} selectedDate={selectedDate} />
      </div>
    );
  }

  private onViewChanged(newView: CalendarViewTypes) {
    this.setState({
      currentView: newView,
    });
  }
}

export default App;
