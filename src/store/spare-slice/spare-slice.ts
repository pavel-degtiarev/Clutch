import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadAllFromDb, saveToDb } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { SpareFormFinalState } from "../../HOC/with-validate-check/check-form";
import { SliceState } from "../store";

interface SpareSliceState extends SliceState, SpareFormFinalState {}

export const spareSlice = createSlice({
  name: "spareSlice",
  initialState: [] as SpareSliceState[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSpare.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(saveSpare.fulfilled, (state, action) => {
        state.push(action.payload);
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
