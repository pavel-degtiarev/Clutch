import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadAllFromDb, saveToDb } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { ServiceFormFinalState } from "../../HOC/with-validate-check/check-form";
import { updateExpencesStat } from "../stat-slice/stat-slice";
import { SliceData } from "../store";

export interface ServiceSliceData extends SliceData, ServiceFormFinalState {}

export const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState: [] as ServiceSliceData[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllService.fulfilled, (state, action) => {
        state = action.payload as ServiceSliceData[];
        return state;
      })
      .addCase(saveService.fulfilled, (state, action) => {
        state.push(action.payload as ServiceSliceData);
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
  async (data: ServiceFormFinalState, thunkAPI) => {
    const result = await saveToDb(dbStoreName.SERVICE, data);
    if (result) thunkAPI.dispatch(updateExpencesStat(data.serviceDate));
    return result
  }
);
