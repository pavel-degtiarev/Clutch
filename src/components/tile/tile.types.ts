type ChartFieldNames = "period" | "value";
type ChartField<T extends ChartFieldNames> = T extends "period" ? string : number;
type ChartRecord<T extends ChartFieldNames> = { [K in T]: ChartField<K> };
export type TileChartData = ChartRecord<ChartFieldNames>[];
