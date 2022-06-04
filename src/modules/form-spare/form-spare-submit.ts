import { SpareFormFields } from "./form-spare";

export default function submitSpareForm(formFields: FormFields<SpareFormFields>): boolean {
	console.log("Send FormSpare data to API", formFields);
	return true;
}
