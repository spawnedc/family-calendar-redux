import { Moment, utc } from "moment";
import { Component } from "react";

export interface IAbstractViewProps {
  selectedDate?: Moment;
}

interface IAbstractViewState {
  selectedDate: Moment;
}

export class AbstractView extends Component<
  IAbstractViewProps,
  IAbstractViewState
> {
  constructor(props: IAbstractViewProps) {
    super(props);
    this.state = {
      selectedDate: this.props.selectedDate || utc(new Date()),
    };
  }
}
