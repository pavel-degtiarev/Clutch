import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OtherFormFinalState } from "../../HOC/with-validate-check/check-form";

export const otherSlice = createSlice({
  name: "otherSlice",
  initialState: [] as OtherFormFinalState[],
  reducers: {
    saveOther: (state, action: PayloadAction<OtherFormFinalState>) => {
      state.push(action.payload);
    },

    deleteOtherById: (state, action: PayloadAction<IdPayload>) => {},
    loadOtherById: (state, action: PayloadAction<IdPayload>) => {},
    loadAllOther: (state) => {},
  },
});

export const { saveOther, deleteOtherById, loadOtherById, loadAllOther } = otherSlice.actions;
export default otherSlice.reducer;
