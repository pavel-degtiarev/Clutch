import ExpencesTileController from "../expences-tile-controller/expences-tile-controller";
import FuelTileController from "../fuel-tile-controller/fuel-tile-controller";
import RunTileController from "../run-tile-controller/run-tile-controller";
import { ClutchStoreType } from "../../store/store";
import TileController from "../tile-controller/tile-controller";
import { TimeInterval } from "../../general/global.var";
import _ from "lodash";

// =============================================

export interface TileData {
  title: string;
  units: string;
  value: number;
  chartData: number[];
}

// =============================================

export default class TilesController {
  private static _instance: TilesController;

  private _store: ClutchStoreType;
  private _controllers: TileController[] = [];
  runController: RunTileController;
  fuelController: FuelTileController;
  expencesController: ExpencesTileController;

  // ================

  constructor(store: ClutchStoreType) {
    if (!TilesController._instance) {
      TilesController._instance = this;
    }

    this._store = store;

    this.runController = new RunTileController(this._store);
    this.fuelController = new FuelTileController(this._store);
    this.expencesController = new ExpencesTileController(this._store);
    this._controllers = [this.runController, this.fuelController, this.expencesController];

    return TilesController._instance;
  }

  async init() {
    await Promise.all(this._controllers.map(async (controller) => controller.initController()));
  }

  async update(timestamp: number) {
    await Promise.all(this._controllers.map(async (controller) => controller.update(timestamp)));
  }

  get tiles() {
    return this._controllers.map((controller) => controller.tile);
  }

  clearTiles() {
    this._controllers.forEach(controller => controller.clearController());
  }

  setOnUpdateCallback(callback: OnUpdateCallback) {
    this._controllers.forEach(controller => controller.setOnUpdateCallback(callback));
  }

  setTimeInterval(value: TimeInterval) {
    this._controllers.forEach(controller => controller.timeInterval = value);
    this.init();
  }
}
