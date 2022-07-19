import dayjs from "dayjs";
import { SpareFormState } from "../../context/form-state/form-init-states";
import { SpareFormFinalState } from "../../utilities/submit-form";

export function convertSpareFields(state: SpareFormState): SpareFormFinalState {
	const finalState: SpareFormFinalState = {
		spareDate: dayjs(state.spareDate).toDate().valueOf(),
		spareTitle: state.spareTitle,
		sparePrice: Number(state.sparePrice),
	};

	return finalState;
}
