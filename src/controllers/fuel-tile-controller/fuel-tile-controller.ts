import { fuelData } from "../../mocks/charts";
import TileController from "../tile-controller/tile-controller";

export default class FuelTileController extends TileController {
  constructor() {
    super();
    this.tileData = {
      title: "Расход топлива",
      units: "л./100 км.",
      value: 8.2,
      chartData: fuelData,
    };
  }
}
