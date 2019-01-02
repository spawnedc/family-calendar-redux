import { MomentDateUnits } from "../../../constants/MomentDateUnits";
import { AbstractView } from "../AbstractView";

export class WeekView extends AbstractView {
  protected getDateUnits(): MomentDateUnits {
    return MomentDateUnits.WEEK;
  }
}
