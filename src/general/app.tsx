import * as React from "react";
import styles from "../styles/global.module.scss";

import Header from "../modules/header/Header";
import Main from "../modules/main-container/main-container";
import Reminder from "../modules/reminder/reminder";
import TabsGroup from "../components/tabs/tabs-group";
import Tiles from "../modules/tiles/tiles";
import PopupSwitch from "../components/popup-switch/popup-switch";
import FormState from "../context/form-state/form-state";
import FormDisplayState from "../context/form-display/form-display-state";

import reminders from "../mocks/reminders";
import { timeTabs } from "../mocks/tabs";
import { expencesData, fuelData, runData } from "../mocks/charts";
import { forms } from "./forms";

import { useClutchStoreDispatch } from "../store/store";
import { fetchAllOther } from "../store/other-slice/other-slice";
import { fetchAllFuel } from "../store/fuel-slice/fuel-slice";
import { fetchAllSpare } from "../store/spare-slice/spare-slice";
import { fetchAllService } from "../store/service-slice/service-slice";

import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");

// ===========================================

export default function App() {
  const storeDispatch = useClutchStoreDispatch();
  Promise.all([
    storeDispatch(fetchAllFuel()),
    storeDispatch(fetchAllService()),
    storeDispatch(fetchAllSpare()),
    storeDispatch(fetchAllOther()),
  ]);

  return (
    <>
      <h1 className={styles.visuallyHidden}>Clutch. Car expenses logbook.</h1>

      <Header
        title="Honda Fit"
        burgerHandler={() => {}}
        // withReturnButton
      />

      <Main>
        <Reminder reminders={reminders} />
        <TabsGroup
          name="time-interval"
          tabs={timeTabs}
          changedHandler={(tab) => console.log(tab)}
        />
        <Tiles runData={runData} fuelData={fuelData} expencesData={expencesData} />

        <FormState>
          <FormDisplayState>
            <PopupSwitch forms={forms} />
          </FormDisplayState>
        </FormState>
      </Main>
    </>
  );
}
