import { ServiceFormFields } from "./form-service";

export default function submitServiceForm(formFields: FormFields<ServiceFormFields>): boolean {
	console.log("Send FormService data to API", formFields);
	return true;
}
