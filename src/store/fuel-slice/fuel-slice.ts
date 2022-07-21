import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FuelFormFinalState } from "../../HOC/with-validate-check/check-form";

interface IdPayload { id: number };

export const fuelSlice = createSlice({
  name: "fuelSlice",
  initialState: [] as FuelFormFinalState[],
  reducers: {
    saveFuel: (state, action: PayloadAction<FuelFormFinalState>) => {
      state.push(action.payload);
    },

    deleteFuelById: (state, action: PayloadAction<IdPayload>) => {},
    loadFuelById: (state, action: PayloadAction<IdPayload>) => {},
    loadAllFuel: (state) => {},
  },
});

export const { saveFuel, deleteFuelById, loadFuelById, loadAllFuel } = fuelSlice.actions;
export default fuelSlice.reducer;
