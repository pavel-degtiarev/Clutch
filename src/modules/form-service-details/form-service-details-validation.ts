import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { ServiceDetailsFormFields, ServiceDetailsFormState } from "../../context/form-state/form-init-states";

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
					newState[section].push({ id: generateId(), title: "", price: 0 });
					break;

				case "delete" as keyof ServiceDetails:
					newState[section].splice(index, 1);
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

function generateId(): number {
	return Math.floor(Math.random() * 1000000000);
}
