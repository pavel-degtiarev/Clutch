import dayjs from "dayjs";
import { OtherFormState } from "../../context/form-state/form-init-states";
import { OtherFormFinalState } from "../../HOC/with-validate-check/check-form";

export function convertOtherFields(state: OtherFormState): OtherFormFinalState {

  const finalState: OtherFormFinalState = {
    otherDate: dayjs(state.otherDate).toDate().valueOf(),
    otherTitle: state.otherTitle,
    otherPrice: Number(state.otherPrice),
  };
  
  return finalState;
}
