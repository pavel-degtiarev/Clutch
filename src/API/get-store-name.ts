import { FinalBasicFormsState } from "../HOC/with-validate-check/check-form";
import { dbStoreName } from "./init-db";

export default function getStoreName<T extends FinalBasicFormsState>(value: T): dbStoreName {
  switch (true) {
    case value!.hasOwnProperty("fuelDate"): return dbStoreName.FUEL;
    case value!.hasOwnProperty("otherDate"): return dbStoreName.OTHER;
    case value!.hasOwnProperty("spareDate"): return dbStoreName.SPARE;
    case value!.hasOwnProperty("serviceDate"): return dbStoreName.SERVICE;
  }
  return "" as never;
}
