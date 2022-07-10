import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import {
	ServiceDetails,
	ServiceDetailsFormFields,
	ServiceDetailsFormState,
} from "./form-service-details";

export default function getValidateServiceDetailsForm(
	setState: setStateFunction<ServiceDetailsFormState>
) {
	return function (target: ServiceDetailsFormFields, value: string) {
		console.log("ServiceDetails form validation", target, value);

		// форма содержит динамический список инпутов.
		// поэтому поля формы не соответствуют полям объекта состояния

		setState((prevState) => {
			const newState = { ...prevState };
			const { section, key, index } = parseTarget(target);

			switch (key) {
				case "add" as keyof ServiceDetails:
					newState[section].push({ title: "", price: 0 });
					break;

				case "price":
					newState[section][index][key] = Number(value);
					break;
				
				case "title":
					newState[section][index][key] = value;
					break;
			}
			
			console.log(newState);
			
			return newState;
		});
	};
}

interface StateItem {
	section: ServiceDetailsFormFields;
	key: keyof ServiceDetails;
	index: number;
}

function parseTarget(target: string): StateItem {
	const parts = target.split("-");
	return {
		section: parts[0] as ServiceDetailsFormFields,
		key: parts[1] as keyof ServiceDetails,
		index: Number(parts[2]),
	};
}

// https://stackoverflow.com/questions/61758438/type-is-not-assignable-to-type-never-2322
// function setChanged<T extends keyof ServiceDetails, V extends ServiceDetails[T]>(
// 	obj: ServiceDetails,
// 	prop: T,
// 	value: V
// ) {
// 	obj[prop] = value;
// }
