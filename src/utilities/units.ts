import { FieldSuffixes, TimeSuffixes } from "../../global.var";

export const setSuffix = (val: string, units: FieldSuffixes | TimeSuffixes): string =>
	val ? `${val} ${units}` : val;

export const removeSuffix = (val: FormDataEntryValue | string): string => {
	let cleanVal = val as string;
	const suffixes = [...Object.values(FieldSuffixes), ...Object.values(TimeSuffixes)];
	suffixes.forEach((unit) => (cleanVal = cleanVal.replace(` ${unit}`, "")));
	return cleanVal;
};
