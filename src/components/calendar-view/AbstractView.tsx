import { Moment, utc } from "moment";
import { Component } from "react";
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
}
