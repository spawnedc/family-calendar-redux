import { utc } from "moment";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateEvents } from "../actions";
import { CalendarEvent } from "../classes/CalendarEvent";
import { EventsService } from "../services/EventsService";

interface IEventListProps {
  events: CalendarEvent[];
  updateEvents: any;
}

class EventList extends React.Component<IEventListProps> {
  public componentDidMount() {
    this.getEvents();
  }

  public render() {
    return <ul>{this.renderList()}</ul>;
  }

  private renderList() {
    return this.props.events.map((event: CalendarEvent) => (
      <li key={event.id}>
        {event.title} {event.startDate && event.startDate.format("LLL")}
      </li>
    ));
  }

  private async getEvents() {
    const events = await EventsService.getAllEventsForMonth(utc());
    this.props.updateEvents(events);
  }
}

const mapStateToProps = (state: any) => ({ events: state.events });

const matchDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ updateEvents }, dispatch);
};

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(EventList);
