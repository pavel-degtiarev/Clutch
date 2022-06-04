import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { SpareFormFields, SpareFormState } from "./form-spare";

export default function validateSpareForm(
	target: SpareFormFields,
	value: string,
	setState: setStateFunction<SpareFormState>
) {
	console.log("Spare form validation");
}
