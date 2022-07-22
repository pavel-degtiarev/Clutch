import { expencesData } from "../../mocks/charts";
import TileController from "../tile-controller/tile-controller";

export default class ExpencesTileController extends TileController {
  constructor() {
    super();
    this.tileData = {
      title: "Затраты",
      units: "руб.",
      value: 1200,
      chartData: expencesData,
    };
  }
}
