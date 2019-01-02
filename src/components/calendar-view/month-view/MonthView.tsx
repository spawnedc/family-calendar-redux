import { Moment } from "moment";
import { MomentDateUnits } from "../../../constants/MomentDateUnits";
import { AbstractView } from "../AbstractView";

export class MonthView extends AbstractView {
  protected dateUnits: MomentDateUnits = MomentDateUnits.MONTH;

  protected getStartDate(selectedDate: Moment): Moment {
    return selectedDate
      .clone()
      .startOf(this.dateUnits)
      .startOf(MomentDateUnits.WEEK);
  }

  protected getEndDate(selectedDate: Moment): Moment {
    return selectedDate
      .clone()
      .endOf(this.dateUnits)
      .endOf(MomentDateUnits.WEEK);
  }
}
