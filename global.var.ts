export enum TimeUnits {
	DAYS = "days",
	MONTHS = "months",
	YEARS = "years",
}

export enum TimeSuffixes {
	ONE_DAY = "день",
	TWO_TO_FOUR_DAYS = "дня",
	MANY_DAYS = "дней",
	ONE_MONTH = "месяц",
	TWO_TO_FOUR_MONTHS = "месяца",
	MANY_MONTHS = "месяцев",
	ONE_YEAR = "год",
	TWO_TO_FOUR_YEARS = "года",
	MANY_YEARS = "лет",
}

export type TimeSlot = {
	label: string;
	value: TimeUnits;
};

export const timeSlotOptions: TimeSlot[] = [
	{
		label: "дни",
		value: TimeUnits.DAYS,
	},
	{
		label: "месяцы",
		value: TimeUnits.MONTHS,
	},
	{
		label: "годы",
		value: TimeUnits.YEARS,
	},
];

export enum YearSuffix {
	SINGLE,
	MULTIPLE,
	LONG,
}

export enum FieldSuffixes {
	RUN = "км.",
	MONEY = "руб.",
	VOLUME = "л.",
}
