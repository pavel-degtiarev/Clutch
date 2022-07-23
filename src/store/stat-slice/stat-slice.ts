import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatTimestamp {
  month: number;
  year: number;
}

interface StatRecord {
  timestamp: StatTimestamp;
  value: number;
}

export const statSlice = createSlice({
  name: "statSlice",
  initialState: {
    fuelStat: [] as StatRecord[],
    runStat: [] as StatRecord[],
    expenceStat: [] as StatRecord[],
  },
  reducers: {
    setFuelStat: (state, action: PayloadAction<StatRecord>) => {
      const statItem = state.fuelStat.find(
        (item) =>
          item.timestamp.month === action.payload.timestamp.month &&
          item.timestamp.year === action.payload.timestamp.year
      );

      statItem ? (statItem.value = action.payload.value) : state.fuelStat.push(action.payload);
    },
  },
});

export default statSlice.reducer;
export const { setFuelStat } = statSlice.actions;
