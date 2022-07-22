import { runData } from "../../mocks/charts";
import TileController from "../tile-controller/tile-controller";

export default class RunTileController extends TileController {
  constructor() {
    super();
    this.tileData = {
      title: "Пробег",
      units: "км.",
      value: 2500,
      chartData: runData,
    };
  }
}
