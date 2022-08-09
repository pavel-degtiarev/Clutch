import React from "react";
import { timeTabs } from "../../general/global.var";
import { remindersController, tilesController } from "../../index";
import FormDisplayState from "../../context/form-display/form-display-state";
import FormState from "../../context/form-state/form-state";
import Reminder from "../reminder/reminder";
import TabsWithContext from "../../components/tabs/tabs-group-context";
import Tiles from "../tiles/tiles";
import PopupSwitch from "../../components/popup-switch/popup-switch";
import { forms } from "../../general/forms";

export default function PageTiles() {
  return (
    <FormState>
      <FormDisplayState>
        <Reminder remindersController={remindersController} />

        <TabsWithContext name="time-interval" tabInfo={timeTabs}>
          <Tiles tilesController={tilesController} />
        </TabsWithContext>

        <PopupSwitch forms={forms} />
      </FormDisplayState>
    </FormState>
  );
}
