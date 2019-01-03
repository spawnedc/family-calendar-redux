import { Moment, utc } from "moment";
import React, { Component } from "react";
import { CalendarViewDropdown } from "./components/calendar-view-dropdown/CalendarViewDropdown";
import { Calendar } from "./components/calendar/Calendar";
import { CalendarViewTypes } from "./constants/CalendarViewTypes";

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
        <CalendarViewDropdown
          currentView={currentView}
          onViewChanged={this.onViewChanged}
        />
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
