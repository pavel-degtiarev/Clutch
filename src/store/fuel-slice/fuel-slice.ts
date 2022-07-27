import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadAllFromDb, saveToDb } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { FuelFormFinalState } from "../../HOC/with-validate-check/check-form";
import { SliceData } from "../store";

export interface FuelSliceData extends SliceData, FuelFormFinalState {}

export const fuelSlice = createSlice({
  name: "fuelSlice",
  initialState: [] as FuelSliceData[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFuel.fulfilled, (state, action) => {
        state = action.payload as FuelSliceData[];
        return state;
      })
      .addCase(saveFuel.fulfilled, (state, action) => {
        state.push(action.payload as FuelSliceData);
        return state;
      });
  },
});

export default fuelSlice.reducer;

export const fetchAllFuel = createAsyncThunk("fuelSlice/fetchAllFuel", async () => {
  return await loadAllFromDb(dbStoreName.FUEL);
});

export const saveFuel = createAsyncThunk("fuelSlice/saveFuel", async (data: FuelFormFinalState) => {
  return await saveToDb(dbStoreName.FUEL, data);
});
