import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import fuelSlice from "./fuel-slice/fuel-slice";
import otherSlice from "./other-slice/other-slice";
import repeatSlice from "./service-repeat-slice/service-repeat-slice";
import serviceSlice from "./service-slice/service-slice";
import spareSlice from "./spare-slice/spare-slice";
import statSlice from "./stat-slice/stat-slice";

export const clutchStore = configureStore({
  reducer: {
    fuel: fuelSlice,
    other: otherSlice,
    service: serviceSlice,
    repeat: repeatSlice,
    spare: spareSlice,
    stat: statSlice,
  },
});

export type ClutchStoreType = typeof clutchStore;
export type ClutchStoreState = ReturnType<typeof clutchStore.getState>;
export type ClutchStoreDispatch = typeof clutchStore.dispatch;

export const useClutchStoreDispatch: () => ClutchStoreDispatch = useDispatch;
export const useClutchStoreSelector: TypedUseSelectorHook<ClutchStoreState> = useSelector;

export interface SliceData {
  id: number;
}
