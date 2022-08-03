import { TimeUnits } from "../../general/global.var";

export type TimeType = {
  interval: number;
  unit: TimeUnits;
};

export enum Urgency {
  NORMAL,
  NEARDUE,
  OVERDUED,
}

export interface RunTrigger {
  run: number;
}
export interface TimeTrigger {
  time: TimeType;
}

export interface Reminder {
  serviceId: number;
  title: string;
  urgency: Urgency.NORMAL | Urgency.NEARDUE | Urgency.OVERDUED;
  trigger: RunTrigger | TimeTrigger;
  initConditions: {
    run: number;
    time: number;
    timeUnits: TimeUnits;
  };
};

export function isRunTrigger(trigger: RunTrigger | TimeTrigger): trigger is RunTrigger {
  return "run" in trigger;
}

export function isTimeTrigger(trigger: RunTrigger | TimeTrigger): trigger is TimeTrigger {
  return "time" in trigger;
}
