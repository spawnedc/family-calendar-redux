import { Moment, utc } from "moment";
import React, { Component } from "react";
import { MomentDateUnits } from "../../constants/MomentDateUnits";

export interface IAbstractViewProps {
  selectedDate?: Moment;
}

interface IAbstractViewState {
  selectedDate: Moment;
}

export abstract class AbstractView extends Component<
  IAbstractViewProps,
  IAbstractViewState
> {
  protected abstract dateUnits: MomentDateUnits;

  constructor(props: IAbstractViewProps) {
    super(props);

    const selectedDate: Moment = this.props.selectedDate || utc(new Date());

    this.state = {
      selectedDate,
    };
  }

  public render() {
    const { selectedDate } = this.state;
    const startDate: Moment = this.getStartDate(selectedDate);
    const endDate: Moment = this.getEndDate(selectedDate);

    const numberOfWeeks = Math.round(
      endDate.diff(startDate, MomentDateUnits.WEEK, true),
    );
    return (
      <>
        <p>{this.dateUnits}</p>
        <p>{selectedDate.format("LLL")}</p>
        <p>{startDate.format("LLL")}</p>
        <p>{endDate.format("LLL")}</p>
        <p>{numberOfWeeks}</p>
      </>
    );
  }

  protected abstract getStartDate(selectedDate: Moment): Moment;
  protected abstract getEndDate(selectedDate: Moment): Moment;
}
