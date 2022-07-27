import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadAllFromDb, saveToDb } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { SpareFormFinalState } from "../../HOC/with-validate-check/check-form";
import { SliceData } from "../store";

export interface SpareSliceData extends SliceData, SpareFormFinalState {}

export const spareSlice = createSlice({
  name: "spareSlice",
  initialState: [] as SpareSliceData[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSpare.fulfilled, (state, action) => {
        state = action.payload as SpareSliceData[];
        return state;
      })
      .addCase(saveSpare.fulfilled, (state, action) => {
        state.push(action.payload as SpareSliceData);
        return state;
      });
  },
});

export default spareSlice.reducer;

export const fetchAllSpare = createAsyncThunk("spareSlice/fetchAllSpare", async () => {
  return await loadAllFromDb(dbStoreName.SPARE);
});

export const saveSpare = createAsyncThunk("spareSlice/saveSpare", async (data: SpareFormFinalState) => {
  return await saveToDb(dbStoreName.SPARE, data);
});
