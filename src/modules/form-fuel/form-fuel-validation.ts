import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { FuelFormFields, FuelFormState } from "./form-fuel";

export default function getValidateFuelForm(setState: setStateFunction<FuelFormState>) {
	return function (target: FuelFormFields, value: string) {

		const validations: FormValidations<FuelFormFields> = {
			fuelDate: (value) => console.log("check if Date is consistent", value),
			fuelRun: (value) => console.log("check if Run is consistent", value),

			fuelCost: (value) => {
				setState((prevState) => {
					const newState = { ...prevState, fuelCost: value }; // calc volume with fixed price
					if (+newState.fuelPrice > 0) {
						newState.fuelVolume = `${
							Math.round((+newState.fuelCost / +newState.fuelPrice) * 10) / 10
						}`;
					}
					if (+newState.fuelCost == 0) {
						newState.fuelVolume = "";
					}
					return newState;
				});
			},

			fuelPrice: (value) => {
				setState((prevState) => {
					const newState = { ...prevState, fuelPrice: value }; // calc volume with fixed cost
					if (+newState.fuelCost > 0) {
						newState.fuelVolume = `${
							Math.round((+newState.fuelCost / +newState.fuelPrice) * 10) / 10
						}`;
					}
					if (+newState.fuelPrice == 0) {
						newState.fuelVolume = "";
					}
					return newState;
				});
			},

			fuelVolume: (value) => {
				setState((prevState) => {
					const newState = { ...prevState, fuelVolume: value }; // calc cost with fixed price
					if (+newState.fuelPrice > 0) {
						newState.fuelCost = `${Math.round(+newState.fuelVolume * +newState.fuelPrice)}`;
					}
					if (+newState.fuelVolume == 0) {
						newState.fuelCost = "";
					}
					return newState;
				});
			},
		};

		console.log("Fuel form validation", target, value);

		const checkTarget = validations[target];
		checkTarget && checkTarget(value);
	}
};
