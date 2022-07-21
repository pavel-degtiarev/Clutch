import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SpareFormFinalState } from "../../HOC/with-validate-check/check-form";

export const spareSlice = createSlice({
  name: "spareSlice",
  initialState: [] as SpareFormFinalState[],
  reducers: {
    saveSpare: (state, action: PayloadAction<SpareFormFinalState>) => {
      state.push(action.payload);
    },

    deleteSpareById: (state, action: PayloadAction<IdPayload>) => {},
    loadSpareById: (state, action: PayloadAction<IdPayload>) => {},
    loadAllSpare: (state) => {},
  },
});

export const { saveSpare, deleteSpareById, loadSpareById, loadAllSpare } = spareSlice.actions;
export default spareSlice.reducer;
