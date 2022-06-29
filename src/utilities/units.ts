import { FieldSuffixes, TimeSuffixes, TimeUnits } from "../../global.var";

export const addSuffix = (val: string, suffix: FieldSuffixes | TimeSuffixes): string =>
	val ? `${val} ${suffix}` : val;

export const removeSuffix = (val: FormDataEntryValue | string): string => {
	let cleanVal = val as string;
	const suffixes = [...Object.values(FieldSuffixes), ...Object.values(TimeSuffixes)];
	suffixes.forEach((unit) => (cleanVal = cleanVal.replace(` ${unit}`, "")));
	return cleanVal;
};

export function getTimeSuffix(value: string, timeSlot: TimeUnits): TimeSuffixes {
	
	const lastDigit = +value - Math.floor(+value / 10) * 10;

	const suffixes = {
		[TimeUnits.DAYS]: {
			ONE: TimeSuffixes.ONE_DAY,
			TWO_TO_FOUR: TimeSuffixes.TWO_TO_FOUR_DAYS,
			MANY: TimeSuffixes.MANY_DAYS,
		},
		[TimeUnits.MONTHS]: {
			ONE: TimeSuffixes.ONE_MONTH,
			TWO_TO_FOUR: TimeSuffixes.TWO_TO_FOUR_MONTHS,
			MANY: TimeSuffixes.MANY_MONTHS,
		},
		[TimeUnits.YEARS]: {
			ONE: TimeSuffixes.ONE_YEAR,
			TWO_TO_FOUR: TimeSuffixes.TWO_TO_FOUR_YEARS,
			MANY: TimeSuffixes.MANY_YEARS,
		},
	};

	switch (true) {
		case +value > 4 && +value <= 20:
		case lastDigit > 4 || lastDigit === 0:
			return suffixes[timeSlot].MANY;

		case lastDigit >= 2 && lastDigit <= 4:
			return suffixes[timeSlot].TWO_TO_FOUR;
	}

	return suffixes[timeSlot].ONE;
}
