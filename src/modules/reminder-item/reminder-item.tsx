import React from "react";
import classNames from "classnames";
import getYearsSuffix from "../../utilities/get-years-suffix";
import { TimelUnit, YearSuffix } from "../../../global.var";

import textStyles from "../../styles/typography.module.scss";
import styles from "./reminder-item.module.scss";

// ===========================================

interface IReminderProps {
	title: string;
	overdued?: boolean;
}

interface IReminderRunProps extends IReminderProps {
	run: number;
	time?: TimeType;
}

interface IReminderTimeProps extends IReminderProps {
	run?: number;
	time: TimeType;
}

type ReminderItemProps = IReminderRunProps | IReminderTimeProps;

// ===========================================

export default function ReminderItem({ title, run, time, overdued = false }: ReminderItemProps) {
	let interval: string = "";

	if (time) {
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
	}

	return (
		<div className={styles.slide}>
			<p className={classNames(textStyles.titleNormal, textStyles.noWrap)}>{title}</p>
			<div className={styles.period}>
				{run && <p className={styles.run}>{run}</p>}
				{time && <p className={classNames(styles.time, `${interval}`)}>{time.interval}</p>}
			</div>
		</div>
	);
}
