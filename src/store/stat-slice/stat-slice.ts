import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tilesController } from "../../index";

export interface StatRecord {
  timestamp: number;
  value: number;
}

export type Statistics = ReturnType<typeof statSlice.getInitialState>;
export type StatisticsFields = keyof Statistics;
export type StatData<T extends keyof Statistics> = Record<T, StatRecord[]>;

export const statSlice = createSlice({
  name: "statSlice",
  initialState: {
    fuelStat: [] as StatRecord[],
    runStat: [] as StatRecord[],
    expenceStat: [] as StatRecord[],
  },
  reducers: {
    setFuelStat: (state, action: PayloadAction<StatRecord>) => setStat(state.fuelStat, action),
    setRunStat: (state, action: PayloadAction<StatRecord>) => setStat(state.runStat, action),
    setExpenceStat: (state, action: PayloadAction<StatRecord>) => setStat(state.expenceStat, action),
    clearFuelStat: (state) => { state.fuelStat = [] },
    clearRunStat: (state) => { state.runStat = [] },
    clearExpenceStat: (state) => { state.expenceStat = [] },
  },
});

export const updateStats = createAsyncThunk(
  "statSlice/updateStats",
  async (timestamp: number) => {
    tilesController.update(timestamp);
  }
);

export const updateFuelStat = createAsyncThunk(
  "statSlice/updateFuelStat",
  async (timestamp: number) => {
    tilesController.fuelController.update(timestamp);
  }
);

export const updateRunStat = createAsyncThunk(
  "statSlice/updateRunStat",
  async (timestamp: number) => {
    tilesController.runController.update(timestamp);
  }
);

export const updateExpencesStat = createAsyncThunk(
  "statSlice/updateExpencesStat",
  async (timestamp: number) => {
    tilesController.expencesController.update(timestamp);
  }
);

function setStat(storeField: StatRecord[], action: { type: string; payload: StatRecord }) {
  const statItem = storeField.find((item) => item.timestamp === action.payload.timestamp);
  statItem ? (statItem.value = action.payload.value) : storeField.push(action.payload);
}

export default statSlice.reducer;
export const {
  setFuelStat,
  setRunStat,
  setExpenceStat,
  clearFuelStat,
  clearRunStat,
  clearExpenceStat,
} = statSlice.actions;
