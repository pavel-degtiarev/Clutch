import { FieldUnits } from "../../global.var";

export const setUnits = (val: string, units: FieldUnits): string => (val ? `${val} ${units}` : val);
export const removeUnits = (val: FormDataEntryValue | string): string => {
	let cleanVal = val as string;
	Object.values(FieldUnits).forEach((unit) => (cleanVal = cleanVal.replace(` ${unit}`, "")));
	return cleanVal;
};
