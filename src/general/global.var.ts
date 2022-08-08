export enum TimeUnits {
  DAY = "days",
  MONTH = "months",
  YEAR = "years",
}

export enum TimeInterval {
  MONTH = "month",
  YEAR = "year",
}

export enum StatTabs {
  STAT = "stat",
  LIST = "list"
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
    value: TimeUnits.DAY,
  },
  {
    label: "месяцы",
    value: TimeUnits.MONTH,
  },
  {
    label: "годы",
    value: TimeUnits.YEAR,
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
