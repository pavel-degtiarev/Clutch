import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { FuelFormFields, FuelFormState } from "./form-fuel";

export default function validateFuelForm(
	target: FuelFormFields,
	value: string,
	setState: setStateFunction<FuelFormState>
) {  
	const validations: FormValidations<FuelFormFields> = {
		date: (value) => console.log("check if Run is consistent", value),
		run: (value) => console.log("check if Run is consistent", value),

		cost: (value) => {
			setState((prevState) => {
				const newState = { ...prevState, cost: value }; // calc volume with fixed price
				if (+newState.price > 0) {
					newState.volume = `${Math.round((+newState.cost / +newState.price) * 10) / 10}`;
				}
				if (+newState.cost == 0) {
					newState.volume = "";
				}
				return newState;
			});
		},

		price: (value) => {
			setState((prevState) => {
				const newState = { ...prevState, price: value }; // calc volume with fixed cost
				if (+newState.cost > 0) {
					newState.volume = `${Math.round((+newState.cost / +newState.price) * 10) / 10}`;
				}
				if (+newState.price == 0) {
					newState.volume = "";
				}
				return newState;
			});
		},

		volume: (value) => {
			setState((prevState) => {
				const newState = { ...prevState, volume: value }; // calc cost with fixed price
				if (+newState.price > 0) {
					newState.cost = `${Math.round(+newState.volume * +newState.price)}`;
				}
				if (+newState.volume == 0) {
					newState.cost = "";
				}
				return newState;
			});
		},
	};

	const checkTarget = validations[target];
	checkTarget && checkTarget(value);
}
