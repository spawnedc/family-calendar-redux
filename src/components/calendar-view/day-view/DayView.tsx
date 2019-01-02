import { MomentDateUnits } from "../../../constants/MomentDateUnits";
import { AbstractView } from "../AbstractView";

export class DayView extends AbstractView {
  protected getDateUnits(): MomentDateUnits {
    return MomentDateUnits.DAY;
  }
}
