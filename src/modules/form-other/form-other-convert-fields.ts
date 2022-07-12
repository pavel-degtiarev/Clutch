import dayjs from "dayjs";
import { OtherFormFinalState } from "../../utilities/submit-form";
import { OtherFormState } from "./form-other";

export function convertOtherFields(state: OtherFormState): OtherFormFinalState {

  const finalState: OtherFormFinalState = {
		otherDate: dayjs(state.otherDate).toDate().valueOf(),
		otherTitle: state.otherTitle,
		otherPrice: Number(state.otherPrice),
	};
  
	return finalState;
}
