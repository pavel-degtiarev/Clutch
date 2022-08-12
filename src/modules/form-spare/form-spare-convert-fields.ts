import dayjs from "dayjs";
import { SpareFormState } from "../../context/form-state/form-init-states";
import { SpareFormFinalState } from "../../HOC/with-validate-check/check-form";

export function convertSpareFields(state: SpareFormState): SpareFormFinalState {
  const finalState: SpareFormFinalState = {
    ...state,
    spareDate: dayjs(state.spareDate).toDate().valueOf(),
    spareTitle: state.spareTitle,
    sparePrice: Number(state.sparePrice),
  };

  return finalState;
}
