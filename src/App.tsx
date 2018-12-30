import React, { Component } from "react";
import { CalendarViewDropdown } from "./components/calendar-view-dropdown/CalendarViewDropdown";
import { Calendar } from "./components/calendar/Calendar";
import { CalendarViewTypes } from "./constants/CalendarViewTypes";

interface IAppState {
  currentView: CalendarViewTypes;
}

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentView: CalendarViewTypes.MONTH,
    };
    this.onViewChanged = this.onViewChanged.bind(this);
  }

  public render() {
    return (
      <>
        <CalendarViewDropdown
          currentView={this.state.currentView}
          onViewChanged={this.onViewChanged}
        />
        <Calendar viewType={this.state.currentView} />
      </>
    );
  }

  private onViewChanged(newView: CalendarViewTypes) {
    this.setState({
      currentView: newView,
    });
  }
}

export default App;
