import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import fuelSlice from "./fuel-slice/fuel-slice";

export const clutchStore = configureStore({
  reducer: {
    fuel: fuelSlice,
  },
});

export type clutchStoreState = ReturnType<typeof clutchStore.getState>;
export type clutchStoreDispatch = typeof clutchStore.dispatch;

export const useClutchStoreDispatch: () => clutchStoreDispatch = useDispatch;
export const useClutchStoreSelector: TypedUseSelectorHook<clutchStoreState> = useSelector;
