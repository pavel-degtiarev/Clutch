import { TimelUnit } from "../../../global.var";

export type TimeType = {
	interval: number;
	unit: TimelUnit;
};

export enum TriggerKind {
	RUN,
	TIME,
	RUNTIME,
}

export interface RunTrigger {
	kind: TriggerKind.RUN;
	run: number;
}

export interface TimeTrigger {
	kind: TriggerKind.TIME;
	time: TimeType;
}

export interface RunTimeTrigger {
	kind: TriggerKind.RUNTIME;
	run: number;
	time: TimeType;
}

export type TriggerType = RunTrigger | TimeTrigger | RunTimeTrigger;

export interface TReminder {
	title: string;
	overdued: boolean;
	trigger: TriggerType;
}
