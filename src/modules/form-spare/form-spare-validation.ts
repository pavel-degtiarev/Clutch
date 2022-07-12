import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { SpareFormFields, SpareFormState } from "./form-spare";

export default function getValidateSpareForm(setState: setStateFunction<SpareFormState>) {
	return function (target: SpareFormFields, value: string) {
		const validations: FormValidations<SpareFormFields> = {
			spareDate: (value) => {
				setState((prevState) => {
					const newState = { ...prevState, spareDate: value };
					return newState;
				});
			},

			spareTitle: (value) => {
				setState((prevState) => {
					const newState = { ...prevState, spareTitle: value };
					return newState;
				});
			},

			sparePrice: (value) => {
				setState((prevState) => {
					const newState = { ...prevState, sparePrice: value };
					return newState;
				});
			},
		};

		const checkTarget = validations[target];
		checkTarget && checkTarget(value);
	};
}
