import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/ru";

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { clutchStore } from "./store/store";
import initClutchDB from "./API/init-db";
import { TilesController } from "./controllers/tiles-controller/tiles-controller";
import App from "./general/app";

dayjs.locale("ru");
dayjs.extend(isSameOrBefore);

import "reseter.css";

export const tilesController = new TilesController(clutchStore);

const container = document.getElementById("clutch-container");
const root = createRoot(container!);

initClutchDB()
  .then(() => tilesController.init())
  .then(() => tilesController.updateTiles())
  .then(() => {
    root.render(
      <Provider store={clutchStore}>
        <App tilesController={tilesController} />
      </Provider>
    );
  });
