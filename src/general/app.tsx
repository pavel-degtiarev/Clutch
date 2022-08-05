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

import { forms } from "./forms";

import { remindersController, tilesController, titleController } from "../index";
import TabsGroupContext from "../components/tabs/tabs-group-context";
import { deleteClutchDb } from "../API/init-db";

// ===========================================

export enum TimeInterval {
  MONTH = "month",
  YEAR = "year",
}

const timeTabs: TabInfo[] = [
  { id: TimeInterval.MONTH, title: "Месяц" },
  { id: TimeInterval.YEAR, title: "Год" },
];

function deleteData(): void {
  const deleteMsg = `Удалить все данные?
  Эта операция необратима!`;
  
  if (window.confirm(deleteMsg)) {
    titleController.clearTitle();
    tilesController.clearTiles();
    remindersController.clearReminders();
    deleteClutchDb();
  }
}

export default function App() {
  return (
    <>
      <h1 className={styles.visuallyHidden}>Clutch. Car expenses logbook.</h1>

      <Header controller={titleController} onDeleteData={deleteData} />

      <Main>
        <FormState>
          <FormDisplayState>
            <Reminder remindersController={remindersController} />

            <TabsGroupContext tabInfo={timeTabs}>
              <TabsGroup name="time-interval" />
              <Tiles tilesController={tilesController} />
            </TabsGroupContext>

            <PopupSwitch forms={forms} />
          </FormDisplayState>
        </FormState>
      </Main>
    </>
  );
}
