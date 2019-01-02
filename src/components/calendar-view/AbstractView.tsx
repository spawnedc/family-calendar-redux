import { Moment, utc } from "moment";
import { DateRange } from "moment-range";
import React, { Component } from "react";
import { DateFormats } from "../../constants/DateFormats";
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

    const weekRanges: DateRange[] = this.getDateRanges(selectedDate);

    const weeks: JSX.Element[] = weekRanges.map((weekRange: DateRange) => {
      const daysInRange: Moment[] = Array.from(
        weekRange.by(MomentDateUnits.DAY),
      );
      const days: JSX.Element[] = daysInRange.map((day: Moment) => (
        <td key={day.format(DateFormats.SHORT)}>
          {day.format(DateFormats.DAY)}
        </td>
      ));
      return (
        <tr key={weekRange.start.format(DateFormats.WEEK_WITH_YEAR)}>{days}</tr>
      );
    });

    return (
      <>
        <table>
          <tbody>{weeks}</tbody>
        </table>
      </>
    );
  }

  protected getDateRanges(selectedDate: Moment): DateRange[] {
    const startDate: Moment = this.getStartDate(selectedDate);
    const endDate: Moment = this.getEndDate(selectedDate);

    const range: DateRange = new DateRange(startDate, endDate);
    const weeksInRange = Array.from(range.by(MomentDateUnits.WEEK));

    return weeksInRange.map((startOfWeek: Moment) => {
      const endOfWeek: Moment = startOfWeek.clone().endOf(MomentDateUnits.WEEK);
      return new DateRange(startOfWeek, endOfWeek);
    });
  }

  protected abstract getStartDate(selectedDate: Moment): Moment;
  protected abstract getEndDate(selectedDate: Moment): Moment;
}
