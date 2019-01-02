import { Moment } from "moment";
import { MomentDateUnits } from "../../../constants/MomentDateUnits";
import { AbstractView } from "../AbstractView";

export class DayView extends AbstractView {
  protected dateUnits: MomentDateUnits = MomentDateUnits.DAY;

  protected getStartDate(selectedDate: Moment): Moment {
    return selectedDate.clone().startOf(this.dateUnits);
  }

  protected getEndDate(selectedDate: Moment): Moment {
    return selectedDate.clone().endOf(this.dateUnits);
  }
}
