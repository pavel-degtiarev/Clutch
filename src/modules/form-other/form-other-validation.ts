import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { OtherFormFields, OtherFormState } from "./form-other";

export default function validateOtherForm(
	target: OtherFormFields,
	value: string,
	setState: setStateFunction<OtherFormState>
) {
	console.log("Other form validation");
}
