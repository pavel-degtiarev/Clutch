import { removeSuffix } from "./units";

export function collectFormFields<T extends string>(formRef: HTMLFormElement) {
	const form = new FormData(formRef);
	const formFields: FormFields<T> = {} as FormFields<T>;

	[...form].forEach(([key, value]) => (formFields[key as T] = removeSuffix(value)));
	return formFields;
}
