import * as React from "react";
import styles from "./styles/global.module.scss";

import Header from "./modules/header/Header";
import Main from "./modules/main-container/main-container";
import Reminder from "./modules/reminder/reminder";
import TabsGroup from "./components/tabs/tabs-group";
import Tiles from "./modules/tiles/tiles";
import PopupSwitch from "./components/popup-switch/popup-switch";
import { FormItem } from "./components/popup-switch/popup-switch.types";
import FormFuel from "./modules/form-fuel/form-fuel";


// =====================================================

import reminders from "./mocks/reminders";
import { timeTabs } from "./mocks/tabs";
import { expencesData, fuelData, runData } from "./mocks/charts";

const forms: FormItem[] = [
	{ title: "Топливо", form: <FormFuel /> },
	// { title: "Расходники, запчасти", callback: () => console.log("Расходники") },
	// { title: "Сервис", callback: () => console.log("Сервис") },
	// { title: "Прочее", callback: () => console.log("Прочее") },
];

// ===========================================

export default function App() {
	return (
		<>
			<h1 className={styles.visuallyHidden}>Clutch. Car expenses logbook.</h1>

			<Header title="Honda Fit" />
			{/* <Header title="Honda Fit" withReturnButton handler={() => { }}/> */}

			<Main>
				<Reminder reminders={reminders} />
				<TabsGroup name="time-interval" tabs={timeTabs} tabGroupChangedHandler={() => {}} />
				<Tiles runData={runData} fuelData={fuelData} expencesData={expencesData} />

				<PopupSwitch forms={forms} />
			</Main>
		</>
	);
}
