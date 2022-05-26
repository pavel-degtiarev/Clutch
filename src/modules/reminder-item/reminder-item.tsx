import React from "react";
import classNames from "classnames";
import getYearsSuffix from "../../utilities/get-years-suffix";
import { TimelUnit, YearSuffix } from "../../../global.var";

import textStyles from "../../styles/typography.module.scss";
import styles from "./reminder-item.module.scss";
import {
	TTime,
	isRunTrigger,
	isTimeTrigger,
	RunTrigger,
	TimeTrigger,
	Urgency,
} from "./reminder.types";

// ===========================================

function getIntervalClass(time: TTime): string {
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

interface ReminderItemProps {
	title: string;
	urgency: Urgency.NORMAL | Urgency.NEARDUE | Urgency.OVERDUED;
	trigger: RunTrigger | TimeTrigger;
}

export default function ReminderItem({ title, trigger, urgency }: ReminderItemProps) {
	return (
		<div className={styles.slide}>
			<p className={classNames(textStyles.titleNormal, textStyles.noWrap)}>{title}</p>

			<div className={classNames(styles.period, urgency === Urgency.OVERDUED && styles.overdued)}>
				{isRunTrigger(trigger) &&
					<p className={styles.run}>{trigger.run}</p>}

				{isTimeTrigger(trigger) && (
					<p className={classNames(styles.time, getIntervalClass(trigger.time))}>
						{trigger.time.interval}
					</p>
				)}
			</div>
		</div>
	);
}