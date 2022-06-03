import { FormUnits } from "../../global.var";

export const setUnits = (val: string, units: FormUnits): string => (val ? `${val} ${units}` : val);
export const removeUnits = (val: FormDataEntryValue | string): string => {
	let cleanVal = val as string;
	Object.values(FormUnits).forEach((unit) => (cleanVal = cleanVal.replace(` ${unit}`, "")));
	return cleanVal;
};
