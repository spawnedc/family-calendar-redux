import { MomentDateUnits } from "../../../constants/MomentDateUnits";
import { AbstractView } from "../AbstractView";

export class MonthView extends AbstractView {
  protected getDateUnits(): MomentDateUnits {
    return MomentDateUnits.MONTH;
  }
}
