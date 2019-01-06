import { Moment, utc } from "moment";
import React from "react";
import { CalendarEvent } from "../../../classes/CalendarEvent";
import { DateFormats } from "../../../constants/DateFormats";
import { MomentDateUnits } from "../../../constants/MomentDateUnits";
import { EventsService } from "../../../services/EventsService";
import "./day-view.css";

interface IDayViewProps {
  year: number;
  month: number;
  day: number;
  isOutsideOfCurrentMonth?: boolean;
}

interface IDayViewState {
  events: CalendarEvent[];
}

export class DayView extends React.Component<IDayViewProps, IDayViewState> {
  private unmounted: boolean = false;

  constructor(props: IDayViewProps) {
    super(props);
    this.state = {
      events: [],
    };
  }

  public componentDidMount() {
    this.getEvents();
  }

  public componentWillUnmount() {
    this.unmounted = true;
  }

  public render() {
    const dateToDisplay: Moment = this.getDateToDisplay();
    const className: string = this.getClassName(dateToDisplay);
    const { events } = this.state;
    const eventsToRender = events.map((event) => (
      <div className="event" key={event.id}>
        {event.title}
      </div>
    ));

    return (
      <div className={className} key={dateToDisplay.format(DateFormats.SHORT)}>
        <div className="label">{dateToDisplay.format(DateFormats.DAY)}</div>
        <div className="events">{eventsToRender}</div>
      </div>
    );
  }

  private async getEvents(): Promise<void> {
    const events: CalendarEvent[] = await EventsService.getDayEvents(
      this.getDateToDisplay(),
    );

    // This is to prevent memory leaks when a day view is unmounted
    if (!this.unmounted) {
      this.setState({ events });
    }
  }

  private getDateToDisplay(): Moment {
    const { day, month, year } = this.props;
    return utc()
      .year(year)
      .month(month)
      .date(day);
  }

  private getClassName(dateToDisplay: Moment): string {
    const classNames = ["day"];
    const { isOutsideOfCurrentMonth } = this.props;
    const isToday = dateToDisplay.isSame(utc(), MomentDateUnits.DATE);

    if (isToday) {
      classNames.push("is-today");
    }

    if (isOutsideOfCurrentMonth) {
      classNames.push("is-faded");
    }

    return classNames.join(" ");
  }
}
