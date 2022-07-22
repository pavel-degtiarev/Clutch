import { TileData } from "../tiles-controller/tiles-controller";

export default class TileController {
  private _tileData: TileData = { title: "", units: "", value: 0, chartData: [] };

  get tileData(): TileData {
    return this._tileData;
  }

  set tileData(newData: TileData) {
    this._tileData = newData;
  }
}
