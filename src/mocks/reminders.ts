import { TimelUnit } from "../../global.var";
import { IReminder, Urgency } from "../modules/reminder-item/reminder.types";

const reminders: Array<IReminder> = [
	{
		title: "Свечи зажигания",
		urgency: Urgency.NORMAL,
		trigger: {
			run: 7800,
			time: { interval: 2, unit: TimelUnit.YEARS },
		},
	},
	{
		title: "Катушки зажигания",
		urgency: Urgency.OVERDUED,
		trigger: {
			time: { interval: 8, unit: TimelUnit.MONTHS },
		},
	},
	{
		title: "Провода зажигания",
		urgency: Urgency.NEARDUE,
		trigger: {
			run: 1500,
		},
	},
];

export default reminders;
