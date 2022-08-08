import React from "react";
import { TimeInterval } from "../../general/global.var";
import { remindersController, tilesController } from "../../index";
import FormDisplayState from "../../context/form-display/form-display-state";
import FormState from "../../context/form-state/form-state";
import Reminder from "../reminder/reminder";
import TabsGroupContext from "../../components/tabs/tabs-group-context";
import TabsGroup, { TabInfo } from "../../components/tabs/tabs-group";
import Tiles from "../tiles/tiles";
import PopupSwitch from "../../components/popup-switch/popup-switch";
import { forms } from "../../general/forms";

const timeTabs: TabInfo[] = [
  { id: TimeInterval.MONTH, title: "Месяц" },
  { id: TimeInterval.YEAR, title: "Год" },
];

export default function PageTiles() {
  return (
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
  );
}
