import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { OtherFormFields, OtherFormState } from "./form-other";

export default function getValidateOtherForm(setState: setStateFunction<OtherFormState>) {
	return function (target: OtherFormFields, value: string) {
		console.log("Other form validation", target, value);
	}
}
