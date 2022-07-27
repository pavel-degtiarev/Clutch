import React, { useState } from "react";
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
import { forms } from "./forms";

import { ClutchStoreType, useClutchStoreDispatch, useClutchStoreSelector } from "../store/store";
import { useStore } from "react-redux";

import { TilesController } from "../controllers/tiles-controller/tiles-controller";

// ===========================================

interface AppProps {
  tilesController: TilesController;
}

export default function App({ tilesController }: AppProps) {
  // const storeDispatch = useClutchStoreDispatch();
  // const storeSelector = useClutchStoreSelector;
  // const store: ClutchStoreType = useStore();

  const [statData, setStatData] = useState(tilesController.tiles);

  // store.subscribe(tilesController.updateTiles);

  return (
    <>
      <h1 className={styles.visuallyHidden}>Clutch. Car expenses logbook.</h1>

      <Header title="Honda Fit" burgerHandler={() => {}} />

      <Main>
        <Reminder reminders={reminders} />
        <TabsGroup
          name="time-interval"
          tabs={timeTabs}
          changedHandler={(tab) => console.log(tab)}
        />
        <Tiles tilesData={statData} />

        <FormState>
          <FormDisplayState>
            <PopupSwitch forms={forms} />
          </FormDisplayState>
        </FormState>
      </Main>
    </>
  );
}
