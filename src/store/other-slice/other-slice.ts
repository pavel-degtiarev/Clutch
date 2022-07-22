import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadAllFromDb, saveToDb } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { OtherFormFinalState } from "../../HOC/with-validate-check/check-form";
import { SliceState } from "../store";

interface OtherSliceState extends SliceState, OtherFormFinalState {}

export const otherSlice = createSlice({
  name: "otherSlice",
  initialState: {
    rawData: [] as OtherSliceState[],
  },
  reducers: {
    // saveOther: (state, action: PayloadAction<OtherFormFinalState>) => {
    //   state.push({ ...action.payload, id: 0 });
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOther.fulfilled, (state, action) => {
        state.rawData = action.payload;
        return state;
      })
      .addCase(saveOther.fulfilled, (state, action) => {
        state.rawData.push(action.payload);
        return state;
      });
  },
});

export default otherSlice.reducer;
// export const { saveOther } = otherSlice.actions;

export const fetchAllOther = createAsyncThunk("otherSlice/fetchAllOther", async () => {
  return await loadAllFromDb(dbStoreName.OTHER);
});

export const saveOther = createAsyncThunk(
  "otherSlice/saveOther",
  async (data: OtherFormFinalState) => {
    return await saveToDb(dbStoreName.OTHER, data);
  }
);
