import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToDb } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { RepeatFormFinalState } from "../../HOC/with-validate-check/check-form";
import { SliceData } from "../store";

export interface RepeatSliceData extends SliceData, RepeatFormFinalState {}

export const repeatSlice = createSlice({
  name: "repeatSlice",
  initialState: [] as RepeatSliceData[],
  reducers: {
    clearRepeatSlice: (state) => {
      state = [];
      return state;
    },
    setRepeatSlice: (state, action: PayloadAction<RepeatFormFinalState[]>) => {
      state = action.payload as RepeatSliceData[];
      return state;
    },
    addToRepeatSlice: (state, action: PayloadAction<RepeatFormFinalState>) => {
      state.push(action.payload as RepeatSliceData);
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveRepeat.fulfilled, (state, action) => {
      return state;
    });
  },
});

export default repeatSlice.reducer;

export const { clearRepeatSlice, setRepeatSlice, addToRepeatSlice } = repeatSlice.actions;

export const saveRepeat = createAsyncThunk("repeatSlice/saveRepeat",
  async (data: RepeatFormFinalState, thunkAPI) => {
    const result = await saveToDb(dbStoreName.REPEAT, data);
    if (result) thunkAPI.dispatch(addToRepeatSlice(data));
    return result;
  }
);
