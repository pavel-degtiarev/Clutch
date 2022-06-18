import Checkbox from "../../components/checkbox/checkbox";
import FieldDate from "../../components/field/field-date";
import FieldText from "../../components/field/field-text";
import { ControlledField } from "../../components/field/field-types";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input/input-numeric";
import InputDecimal from "../../components/field/input/input-decimal";
import Select from "../../components/select/select";
import { TargetFormFields, ValidateFunction } from "../with-validate-submit/with-validate-submit";

type AnyInput =
	| typeof FieldText
	| typeof FieldDate
	| typeof InputDecimal
	| typeof InputNumeric
	| typeof FieldWithSuffix
	| typeof Checkbox
	| typeof Select;

type ControlledInput<T> = T extends ({ ...args }: infer V) => JSX.Element
	? V extends ControlledField<any>
		? ReturnType<T>
		: never
	: never;

interface ValidatedProps<T extends TargetFormFields> {
	Control: ControlledInput<AnyInput>;
	validate: ValidateFunction<T>;
}

export default function Validated<T extends TargetFormFields>({
	validate, Control }: ValidatedProps<T>) {
	
	const oldHandler = Control.props.changeHandler;
	const newHandler = (value: string): string => {
		const newValue = oldHandler ? oldHandler(value) : value;		
		validate(Control.props.name, newValue);
		return newValue;
	};
	const newProps = { ...Control.props, changeHandler: newHandler };

	return Control.type({ ...newProps });
}
