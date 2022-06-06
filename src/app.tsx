import * as React from "react";
import styles from "./styles/global.module.scss";

import Header from "./modules/header/Header";
import Main from "./modules/main-container/main-container";
import Reminder from "./modules/reminder/reminder";
import TabsGroup from "./components/tabs/tabs-group";
import Tiles from "./modules/tiles/tiles";
import PopupSwitch from "./components/popup-switch/popup-switch";
import { FormItem } from "./components/popup-switch/popup-switch.types";

import WithValidateSubmit from "./HOC/with-validate-submit/with-validate-submit";
import FormFuel, { FuelFormFields, FuelFormState } from "./modules/form-fuel/form-fuel";
import validateFuelForm from "./modules/form-fuel/form-fuel-validation";
import submitFuelForm from "./modules/form-fuel/form-fuel-submit";
import FormOther, { OtherFormFields, OtherFormState } from "./modules/form-other/form-other";
import validateOtherForm from "./modules/form-other/form-other-validation";
import submitOtherForm from "./modules/form-other/form-other-submit";
import FormSpare, { SpareFormFields, SpareFormState } from "./modules/form-spare/form-spare";
import validateSpareForm from "./modules/form-spare/form-spare-validation";
import submitSpareForm from "./modules/form-spare/form-spare-submit";
import FormService, { ServiceFormFields, ServiceFormState } from "./modules/form-service/form-service";
import validateServiceForm from "./modules/form-service/form-service-validation";
import submitServiceForm from "./modules/form-service/service-submit";

import dayjs from "dayjs";
import "dayjs/locale/ru";

// =====================================================

import reminders from "./mocks/reminders";
import { timeTabs } from "./mocks/tabs";
import { expencesData, fuelData, runData } from "./mocks/charts";

dayjs.locale("ru");

const forms: FormItem[] = [
	{
		title: "Топливо",
		form: (
			<WithValidateSubmit<FuelFormFields, FuelFormState>
				Form={FormFuel}
				validate={validateFuelForm}
				submit={submitFuelForm}
			/>
		),
	},
	{
		title: "Расходники, запчасти",
		form: (
			<WithValidateSubmit<SpareFormFields, SpareFormState>
				Form={FormSpare}
				validate={validateSpareForm}
				submit={submitOtherForm}
			/>
		),
	},
	{
		title: "Сервис",
		form: (
			<WithValidateSubmit<ServiceFormFields, ServiceFormState>
				Form={FormService}
				validate={validateServiceForm}
				submit={submitServiceForm}
			/>
		),
	},
	{
		title: "Прочее",
		form: (
			<WithValidateSubmit<OtherFormFields, OtherFormState>
				Form={FormOther}
				validate={validateOtherForm}
				submit={submitSpareForm}
			/>
		),
	},
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
				<TabsGroup name="time-interval" tabs={timeTabs} changedHandler={() => {}} />
				<Tiles runData={runData} fuelData={fuelData} expencesData={expencesData} />

				<PopupSwitch forms={forms} />
			</Main>
		</>
	);
}
