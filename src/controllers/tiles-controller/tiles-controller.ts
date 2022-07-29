import ExpencesTileController from "../expences-tile-controller/expences-tile-controller";
import FuelTileController from "../fuel-tile-controller/fuel-tile-controller";
import RunTileController from "../run-tile-controller/run-tile-controller";
import { ClutchStoreType } from "../../store/store";
import TileController from "../tile-controller/tile-controller";
import _ from "lodash";

// =============================================

export interface TileData {
  title: string;
  units: string;
  value: number;
  chartData: number[];
}

// =============================================

export class TilesController {
  private static _instance: TilesController;

  private _store: ClutchStoreType;
  private _tiles: TileData[];
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

    this._tiles = [];
    return TilesController._instance;
  }

  // ================

  async init() {
    await Promise.all(
      this._controllers.map(async (controller) => controller.initController())
    );
  }

  // ================

  async update(timestamp:number) {
    await Promise.all(
      this._controllers.map(async (controller) => controller.update(timestamp))
    );
  }

  // ================

  get tiles(): TileData[] {
    if (!this._tiles) {
      this.updateTiles();
    }
    return this._tiles;
  }

  // ================

  updateTiles() {
    this._tiles = this._controllers.map((controller) => controller.tile);
  }
}
