import React from "react";
import styles from "../styles/global.module.scss";

import Header from "../modules/header/Header";
import Main from "../modules/main-container/main-container";
import Reminder from "../modules/reminder/reminder";
import TabsGroup, { TabInfo } from "../components/tabs/tabs-group";
import Tiles from "../modules/tiles/tiles";
import PopupSwitch from "../components/popup-switch/popup-switch";
import FormState from "../context/form-state/form-state";
import FormDisplayState from "../context/form-display/form-display-state";

import reminders from "../mocks/reminders";
import { forms } from "./forms";

import { ClutchStoreType, useClutchStoreDispatch, useClutchStoreSelector } from "../store/store";
import { useStore } from "react-redux";
import { tilesController } from "../index";
import TabsGroupContext from "../components/tabs/tabs-group-context";

// ===========================================

export enum TimeInterval {
  MONTH = "month",
  YEAR = "year",
}

const timeTabs: TabInfo[] = [
  { id: TimeInterval.MONTH, title: "Месяц" },
  { id: TimeInterval.YEAR, title: "Год" },
];

export default function App() {
  // const storeDispatch = useClutchStoreDispatch();
  // const storeSelector = useClutchStoreSelector;
  // const store: ClutchStoreType = useStore();

  return (
    <>
      <h1 className={styles.visuallyHidden}>Clutch. Car expenses logbook.</h1>

      <Header title="Honda Fit" burgerHandler={() => {}} />

      <Main>
        <Reminder reminders={reminders} />
        <TabsGroupContext tabInfo={timeTabs}>
          <TabsGroup name="time-interval" />
          <Tiles tilesController={tilesController} />
        </TabsGroupContext>

        <FormState>
          <FormDisplayState>
            <PopupSwitch forms={forms} />
          </FormDisplayState>
        </FormState>
      </Main>
    </>
  );
}
