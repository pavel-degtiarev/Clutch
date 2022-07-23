import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import fuelSlice from "./fuel-slice/fuel-slice";
import otherSlice from "./other-slice/other-slice";
import serviceSlice from "./service-slice/service-slice";
import spareSlice from "./spare-slice/spare-slice";
import statSlice from "./stat-slice/stat-slice";

export const clutchStore = configureStore({
  reducer: {
    fuel: fuelSlice,
    other: otherSlice,
    service: serviceSlice,
    spare: spareSlice,
    stat: statSlice,
  },
});

export type clutchStoreState = ReturnType<typeof clutchStore.getState>;
export type clutchStoreDispatch = typeof clutchStore.dispatch;

export const useClutchStoreDispatch: () => clutchStoreDispatch = useDispatch;
export const useClutchStoreSelector: TypedUseSelectorHook<clutchStoreState> = useSelector;

export interface SliceState {
  id: number;
}
