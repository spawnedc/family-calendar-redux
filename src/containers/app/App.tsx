import { Moment, utc } from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Calendar } from "../../components/calendar/Calendar";
import { Header } from "../../components/header/Header";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { CalendarViewTypes } from "../../constants/CalendarViewTypes";
import GapiLoader from "../gapi-loader";
import "./app.css";

interface IAppProps {
  currentUser: gapi.auth2.GoogleUser;
}

interface IAppState {
  currentView: CalendarViewTypes;
  selectedDate: Moment;
}

class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      currentView: CalendarViewTypes.MONTH,
      selectedDate: utc(new Date()),
    };
    this.viewChangeHandler = this.viewChangeHandler.bind(this);
    this.dateChangeHandler = this.dateChangeHandler.bind(this);
  }

  public render() {
    const { currentView, selectedDate } = this.state;

    if (!this.props.currentUser) {
      return <GapiLoader />;
    }

    const userProfile: gapi.auth2.BasicProfile = this.props.currentUser.getBasicProfile();

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

const mapStateToProps = (state: any) => ({ currentUser: state.currentUser });

export default connect(mapStateToProps)(App);
