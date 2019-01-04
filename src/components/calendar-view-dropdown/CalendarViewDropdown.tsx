import React, { ChangeEvent, Component } from "react";
import { CalendarViewTypes } from "../../constants/CalendarViewTypes";

interface ICalendarViewDropdownProps {
  viewChangeHandler: (newView: CalendarViewTypes) => void;
  currentView: CalendarViewTypes;
}

interface ICalendarViewDropdownState {
  currentView: CalendarViewTypes;
}

export class CalendarViewDropdown extends Component<
  ICalendarViewDropdownProps,
  ICalendarViewDropdownState
> {
  constructor(props: ICalendarViewDropdownProps) {
    super(props);
    this.state = {
      currentView: props.currentView,
    };

    this.valueChangeHandler = this.valueChangeHandler.bind(this);
  }

  public render() {
    const options: JSX.Element[] = Object.keys(CalendarViewTypes).map(
      (key: any) => {
        const value = CalendarViewTypes[key];

        return (
          <option key={key} value={value}>
            {value}
          </option>
        );
      },
    );

    return (
      <div className="calendar-view-dropdown">
        <select
          onChange={this.valueChangeHandler}
          value={this.state.currentView}
        >
          {options}
        </select>
      </div>
    );
  }

  private valueChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
    const newView: CalendarViewTypes = event.currentTarget
      .value as CalendarViewTypes;
    this.setState({
      currentView: newView,
    });

    this.props.viewChangeHandler(newView);
  }
}
