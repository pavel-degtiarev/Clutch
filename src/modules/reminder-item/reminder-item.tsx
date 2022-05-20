import React from "react";
import classNames from "classnames";
import getYearsSuffix from "../../utilities/get-years-suffix";
import { TimelUnit, YearSuffix } from "../../../global.var";

import textStyles from "../../styles/typography.module.scss";
import styles from "./reminder-item.module.scss";
import { TriggerType, RunTrigger, RunTimeTrigger, TriggerKind, TimeTrigger, TimeType, TReminder } from "./reminder.types";

// ===========================================

function isRunTrigger(trigger: TriggerType): trigger is RunTrigger | RunTimeTrigger {
	return trigger.kind === TriggerKind.RUN || trigger.kind === TriggerKind.RUNTIME;
}

function isTimeTrigger(trigger: TriggerType): trigger is TimeTrigger | RunTimeTrigger {
	return trigger.kind === TriggerKind.TIME || trigger.kind === TriggerKind.RUNTIME;
}

function getIntervalClass(time: TimeType) {
	let interval: string = "";

	switch (time.unit) {
		case TimelUnit.DAYS:
			interval = styles.inDays;
			break;

		case TimelUnit.MONTHS:
			interval = styles.inMonths;
			break;

		case TimelUnit.YEARS:
			switch (getYearsSuffix(time)) {
				case YearSuffix.SINGLE:
					interval = styles.inYearsSingle;
					break;
				case YearSuffix.MULTIPLE:
					interval = styles.inYears;
					break;
				case YearSuffix.LONG:
					interval = styles.inYearsLong;
					break;
			}
			break;
	}
	return interval;
}

// ===========================================

export default function ReminderItem({ title, overdued, trigger }: TReminder) {
	return (
		<div className={styles.slide}>
			<p className={classNames(textStyles.titleNormal, textStyles.noWrap)}>{title}</p>
			<div className={styles.period}>
				{isRunTrigger(trigger) && <p className={styles.run}>{trigger.run}</p>}

				{isTimeTrigger(trigger) && (
					<p className={classNames(styles.time, `${getIntervalClass(trigger.time)}`)}>
						{trigger.time.interval}
					</p>
				)}
			</div>
		</div>
	);
}
