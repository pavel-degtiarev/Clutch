import { TimelUnit } from "../../global.var";
import { TReminder, TriggerKind } from "../modules/reminder-item/reminder.types";

const reminders: Array<TReminder> = [
	{
		title: "Свечи зажигания",
		overdued: false,
		trigger: {
			kind: TriggerKind.RUNTIME,
			run: 7800,
			time: { interval: 2, unit: TimelUnit.YEARS },
		},
	},
	{
		title: "Катушки зажигания",
		overdued: false,
		trigger: {
			kind: TriggerKind.TIME,
			time: { interval: 8, unit: TimelUnit.MONTHS },
		},
	},
	{
		title: "Провода зажигания",
		overdued: true,
		trigger: {
			kind: TriggerKind.RUN,
			run: 1500,
		},
	},
];

export default reminders;
