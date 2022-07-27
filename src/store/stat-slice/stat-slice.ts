import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StatRecord {
  timestamp: number;
  value: number;
}

type Statistics = ReturnType<typeof statSlice.getInitialState>;
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
  },
});

function setStat(storeField: StatRecord[], action: { payload: StatRecord; type: string }) {
  const statItem = storeField.find((item) => item.timestamp === action.payload.timestamp);
  statItem ? (statItem.value = action.payload.value) : storeField.push(action.payload);
}

export default statSlice.reducer;
export const { setFuelStat, setRunStat, setExpenceStat } = statSlice.actions;
