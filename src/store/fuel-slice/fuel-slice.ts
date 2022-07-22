import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadAllFromDb, saveToDb } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { FuelFormFinalState } from "../../HOC/with-validate-check/check-form";
import { SliceState } from "../store";

interface FuelSliceState extends SliceState, FuelFormFinalState {}

export const fuelSlice = createSlice({
  name: "fuelSlice",
  initialState: {
    rawData: [] as FuelSliceState[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFuel.fulfilled, (state, action) => {
        state.rawData = action.payload;
        return state;
      })
      .addCase(saveFuel.fulfilled, (state, action) => {
        state.rawData.push(action.payload);
        return state;
      });
  },
});

// export const { saveFuel, deleteFuelById, loadFuelById, loadAllFuel } = fuelSlice.actions;
export default fuelSlice.reducer;

export const fetchAllFuel = createAsyncThunk("fuelSlice/fetchAllFuel", async () => {
  return await loadAllFromDb(dbStoreName.FUEL);
});

export const saveFuel = createAsyncThunk("fuelSlice/saveFuel", async (data: FuelFormFinalState) => {
  return await saveToDb(dbStoreName.FUEL, data);
});
