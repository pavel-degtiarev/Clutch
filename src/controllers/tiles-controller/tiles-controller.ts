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

  // ================

  constructor(store: ClutchStoreType) {
    if (!TilesController._instance) {
      TilesController._instance = this;
    }

    this._store = store;
    this._controllers = [
      new RunTileController(this._store),
      new FuelTileController(this._store),
      new ExpencesTileController(this._store),
    ];
    this._tiles = [];
    return TilesController._instance;
  }

  // ================

  async init() {
    await Promise.all(
      this._controllers.map(async (controller) => await controller.initController())
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
