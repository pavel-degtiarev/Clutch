import React from "react";
import { createRoot } from "react-dom/client";
import { initClutchDB } from "./API/init-db";
import { Provider } from "react-redux";
import { clutchStore } from "./store/store";

import "reseter.css";

import App from "./general/app";

initClutchDB();

const root = createRoot(document.getElementById("clutch-container"));
root.render(
  <Provider store={clutchStore}>
    <App />
  </Provider>
);
