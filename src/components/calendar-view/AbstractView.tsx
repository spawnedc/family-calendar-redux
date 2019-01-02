import { Moment, utc } from "moment";
import React, { Component } from "react";
import { MomentDateUnits } from "../../constants/MomentDateUnits";

export interface IAbstractViewProps {
  selectedDate?: Moment;
}

interface IAbstractViewState {
  selectedDate: Moment;
  startDate: Moment;
  endDate: Moment;
}

export abstract class AbstractView extends Component<
  IAbstractViewProps,
  IAbstractViewState
> {
  constructor(props: IAbstractViewProps) {
    super(props);
    const dateUnits: MomentDateUnits = this.getDateUnits();

    const selectedDate: Moment = this.props.selectedDate || utc(new Date());
    const startDate: Moment = selectedDate.clone().startOf(dateUnits);
    const endDate: Moment = selectedDate.clone().endOf(dateUnits);

    this.state = {
      endDate,
      selectedDate,
      startDate,
    };
  }

  public render() {
    return (
      <>
        <p>{this.getDateUnits()}</p>
        <p>{this.state.selectedDate.format("LLL")}</p>
        <p>{this.state.startDate.format("LLL")}</p>
        <p>{this.state.endDate.format("LLL")}</p>
      </>
    );
  }

  protected getDateUnits(): MomentDateUnits {
    return MomentDateUnits.DAY;
  }
}
