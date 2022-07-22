import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadAllFromDb, saveToDb } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { ServiceFormFinalState } from "../../HOC/with-validate-check/check-form";
import { SliceState } from "../store";

interface ServiceSliceState extends SliceState, ServiceFormFinalState {}

export const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState: [] as ServiceSliceState[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllService.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(saveService.fulfilled, (state, action) => {
        state.push(action.payload);
        return state;
      });
  },
});

export default serviceSlice.reducer;

export const fetchAllService = createAsyncThunk("serviceSlice/fetchAllService", async () => {
  return await loadAllFromDb(dbStoreName.SERVICE);
});

export const saveService = createAsyncThunk(
  "serviceSlice/saveService",
  async (data: ServiceFormFinalState) => {
    return await saveToDb(dbStoreName.SERVICE, data);
  }
);
