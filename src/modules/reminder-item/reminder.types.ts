import { TimelUnit } from "../../../global.var";

export type TTime = {
	interval: number;
	unit: TimelUnit;
};

export enum Urgency {
	NORMAL,
	NEARDUE,
	OVERDUED,
}

interface ReminderBase<T> {
	title: string;
	urgency: Urgency;
	trigger: T;
}

export interface RunTrigger {
	run: number;
}
export interface TimeTrigger {
	time: TTime;
}

export type IReminder = ReminderBase<RunTrigger> | ReminderBase<TimeTrigger>;

export function isRunTrigger(trigger: RunTrigger | TimeTrigger): trigger is RunTrigger {
	return "run" in trigger;
}

export function isTimeTrigger(trigger: RunTrigger | TimeTrigger): trigger is TimeTrigger {
	return "time" in trigger;
}
