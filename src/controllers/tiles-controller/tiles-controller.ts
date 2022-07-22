import ExpencesTileController from "../expences-tile-controller/expences-tile-controller";
import FuelTileController from "../fuel-tile-controller/fuel-tile-controller";
import RunTileController from "../run-tile-controller/run-tile-controller";
import TileController from "../tile-controller/tile-controller";

// =============================================

export interface TileChartRecord {
  period: string;
  value: number;
}

export interface TileData {
  title: string;
  units: string;
  value: number;
  chartData: TileChartRecord[];
}

// =============================================

export class TilesController {
  private static _instance: TilesController;

  private _controllers: TileController[] = [
    new RunTileController(),
    new FuelTileController(),
    new ExpencesTileController(),
  ];

  constructor() {
    if (!TilesController._instance) {
      TilesController._instance = this;
    }

    return TilesController._instance;
  }

  get tiles(): TileData[] {
    return this._controllers.map((controller) => controller.tileData);
  }
}

// type ChartField<T extends keyof TileChartRecord> = T extends "period" ? string : number;
// type ChartRecord<T extends keyof TileChartRecord> = { [K in T]: ChartField<K> };
// type TileChartRecord2 = ChartRecord<keyof TileChartRecord>;
