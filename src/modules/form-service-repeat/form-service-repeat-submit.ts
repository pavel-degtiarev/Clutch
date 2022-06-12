import { ServiceRepeatFormFields } from "./form-service-repeat";

export default function submitServiceRepeatForm(formFields: FormFields<ServiceRepeatFormFields>): boolean {
	console.log("Send FormServiceRepeat data to API", formFields);
	return true;
}
