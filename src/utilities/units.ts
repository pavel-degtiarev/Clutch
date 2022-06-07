import { FieldSuffixes } from "../../global.var";

export const setUnits = (val: string, units: FieldSuffixes): string => (val ? `${val} ${units}` : val);
export const removeUnits = (val: FormDataEntryValue | string): string => {
	let cleanVal = val as string;
	Object.values(FieldSuffixes).forEach((unit) => (cleanVal = cleanVal.replace(` ${unit}`, "")));
	return cleanVal;
};
