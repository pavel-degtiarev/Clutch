import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { SpareFormFields, SpareFormState } from "./form-spare";

export default function getValidateSpareForm(setState: setStateFunction<SpareFormState>) {
	return function (target: SpareFormFields, value: string) {
		console.log("Spare form validation", target, value);
	};
}
