import * as React from "react";
import styles from "./styles/global.module.scss";

import Header from "./modules/header/Header";
import Main from "./modules/main-container/main-container";
import Reminder from "./modules/reminder/reminder";

// =====================================================

import reminders from "./mocks/reminders";

// ===========================================

export default function App() {
	return (
		<>
			<h1 className={styles.visuallyHidden}>Clutch. Car expenses logbook.</h1>

			<Header title="Honda Fit" />
			{/* <Header title="Honda Fit" withReturnButton handler={() => { }}/> */}

			<Main>
				<Reminder reminders={reminders} />
			</Main>
		</>
	);
}
