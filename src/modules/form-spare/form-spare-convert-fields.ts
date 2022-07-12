import dayjs from "dayjs";
import { SpareFormFinalState } from "../../utilities/submit-form";
import { SpareFormState } from "./form-spare";

export function convertSpareFields(state: SpareFormState): SpareFormFinalState {
	const finalState: SpareFormFinalState = {
		spareDate: dayjs(state.spareDate).toDate().valueOf(),
		spareTitle: state.spareTitle,
		sparePrice: Number(state.sparePrice),
	};

	return finalState;
}
