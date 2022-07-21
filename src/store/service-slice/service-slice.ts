import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceFormFinalState } from "../../HOC/with-validate-check/check-form";

export const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState: [] as ServiceFormFinalState[],
  reducers: {
    saveService: (state, action: PayloadAction<ServiceFormFinalState>) => {
      state.push(action.payload);
    },

    deleteServiceById: (state, action: PayloadAction<IdPayload>) => {},
    loadServiceById: (state, action: PayloadAction<IdPayload>) => {},
    loadAllService: (state) => {},
  },
});

export const { saveService, deleteServiceById, loadServiceById, loadAllService } = serviceSlice.actions;
export default serviceSlice.reducer;
