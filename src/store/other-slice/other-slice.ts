import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadAllFromDb, saveToDb } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { OtherFormFinalState } from "../../HOC/with-validate-check/check-form";
import { updateExpencesStat } from "../stat-slice/stat-slice";
import { SliceData } from "../store";

export interface OtherSliceData extends SliceData, OtherFormFinalState {}

export const otherSlice = createSlice({
  name: "otherSlice",
  initialState: [] as OtherSliceData[],
  reducers: {
    // saveOther: (state, action: PayloadAction<OtherFormFinalState>) => {
    //   state.push({ ...action.payload, id: 0 });
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOther.fulfilled, (state, action) => {
        state = action.payload as OtherSliceData[];
        return state;
      })
      .addCase(saveOther.fulfilled, (state, action) => {
        state.push(action.payload as OtherSliceData);
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
  async (data: OtherFormFinalState, thunkAPI) => {
    const result = await saveToDb(dbStoreName.OTHER, data);
    if (result) thunkAPI.dispatch(updateExpencesStat(data.otherDate));
    return result;
  }
);
