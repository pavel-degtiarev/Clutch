import { OtherFormFields } from "./form-other";

export default function submitOtherForm(formFields: FormFields<OtherFormFields>): boolean {
	console.log("Send FormOther data to API", formFields);
	return true;
}
