import * as React from "react";
import styles from "./styles/global.module.scss";

import Header from "./modules/header/Header";
import Main from "./modules/main-container/main-container";
import Reminder from "./modules/reminder/reminder";
import TabsGroup from "./components/tabs/tabs-group";
import Tiles from "./modules/tiles/tiles";
import ButtonRollup from "./modules/button-rollup/button-rollup";

// =====================================================

import reminders from "./mocks/reminders";
import { timeTabs } from "./mocks/tabs";
import { expencesData, fuelData, runData } from "./mocks/charts";

// ===========================================

export default function App() {
	return (
		<>
			<h1 className={styles.visuallyHidden}>Clutch. Car expenses logbook.</h1>

			<Header title="Honda Fit" />
			{/* <Header title="Honda Fit" withReturnButton handler={() => { }}/> */}

			<Main>
				<Reminder reminders={reminders} />
				<TabsGroup name="time-interval" tabs={timeTabs}
					tabGroupChangedHandler={(tabId) => console.log(tabId)}
				/>
				<Tiles runData={runData} fuelData={fuelData} expencesData={expencesData} />

				<ButtonRollup />
			</Main>
		</>
	);
}
