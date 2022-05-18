import React from "react";
import { createRoot } from "react-dom/client";

import "reseter.css";

import App from "./app";

const root = createRoot(document.getElementById("clutch-container"));
root.render(<App />);
