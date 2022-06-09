import { FieldSuffixes, TimeSuffixes } from "../../global.var";

export const addSuffix = (val: string, suffix: FieldSuffixes | TimeSuffixes): string =>
	val ? `${val} ${suffix}` : val;

export const removeSuffix = (val: FormDataEntryValue | string): string => {
	let cleanVal = val as string;
	const suffixes = [...Object.values(FieldSuffixes), ...Object.values(TimeSuffixes)];
	suffixes.forEach((unit) => (cleanVal = cleanVal.replace(` ${unit}`, "")));
	return cleanVal;
};
