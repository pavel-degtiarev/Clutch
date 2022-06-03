import { removeUnits } from "./units";

export function collectFormFields(formRef: HTMLFormElement) {
	const form = new FormData(formRef);
	const formFields: FormFields = {};

	[...form].forEach(([key, value]) => (formFields[key] = removeUnits(value)));
	return formFields;
}
