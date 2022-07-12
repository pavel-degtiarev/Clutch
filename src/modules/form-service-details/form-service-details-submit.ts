import { ServiceDetailsFormFields, ServiceDetailsFormState } from "./form-service-details";

export default function submitServiceDetailsForm(state: ServiceDetailsFormState): boolean {
	console.log("Send FormServiceDetails data to API");
	return true;
}
// export default function submitServiceDetailsForm(
// 	formFields: FormFields<ServiceDetailsFormFields>
// ): boolean {
// 	console.log("Send FormServiceDetails data to API", formFields);
// 	return true;
// }
