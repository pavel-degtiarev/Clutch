import { FuelFormFields } from "./form-fuel";

export default function submitFuelForm(formFields: FormFields<FuelFormFields>): boolean {
	console.log("Send FormFuel data to API", formFields);
	return true;
}
