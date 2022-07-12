import { ServiceFormFields, ServiceFormState } from "./form-service";

export default function submitServiceForm(state: ServiceFormState): boolean {
	console.log("Send FormService data to API");
	return true;
}
// export default function submitServiceForm(formFields: FormFields<ServiceFormFields>): boolean {
// 	console.log("Send FormService data to API", formFields);
// 	return true;
// }
