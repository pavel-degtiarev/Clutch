import { ServiceDetailsFormFields } from "./form-service-details";

export default function submitServiceDetailsForm(
	formFields: FormFields<ServiceDetailsFormFields>
): boolean {
	console.log("Send FormServiceDetails data to API", formFields);
	return true;
}
