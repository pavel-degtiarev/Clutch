import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/ru";

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { clutchStore } from "./store/store";
import initClutchDB from "./API/init-db";
import { TilesController } from "./controllers/tiles-controller/tiles-controller";
import { RemindersController } from "./controllers/reminders-controller/reminders-controller";
import App from "./general/app";

dayjs.locale("ru");
dayjs.extend(isSameOrBefore);

import "reseter.css";

export const tilesController = new TilesController(clutchStore);
export const remindersController = new RemindersController(clutchStore);

const container = document.getElementById("clutch-container");
const root = createRoot(container!);

initClutchDB()
  .then(() => Promise.all([tilesController.init(), remindersController.init()]))
  .then(() => {
    root.render(
      <Provider store={clutchStore}>
        <App />
      </Provider>
    );
  });
