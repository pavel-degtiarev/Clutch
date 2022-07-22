import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { clutchStore } from "./store/store";
import initClutchDB from "./API/init-db";
import App from "./general/app";
import "reseter.css";

const root = createRoot(document.getElementById("clutch-container"));

initClutchDB().then(() => {
  root.render(
    <Provider store={clutchStore}>
      <App />
    </Provider>
  );
});
