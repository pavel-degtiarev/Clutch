import { DBSchema, IDBPDatabase, openDB } from "idb";
import { FuelFormFinalState, OtherFormFinalState, RepeatFormFinalState, ServiceFormFinalState, SpareFormFinalState } from "../HOC/with-validate-check/check-form";

export enum dbStoreName {
  FUEL = "fuel",
  SERVICE = "service",
  SPARE = "spare",
  OTHER = "other",
  REPEAT = "repeat",
}

export interface ClutchDBSchema extends DBSchema {
  [dbStoreName.FUEL]: {
    key: number;
    value: FuelFormFinalState;
    indexes: { date: number };
  };
  [dbStoreName.SERVICE]: {
    key: number;
    value: ServiceFormFinalState;
    indexes: { date: number };
  };
  [dbStoreName.SPARE]: {
    key: number;
    value: SpareFormFinalState;
    indexes: { date: number };
  };
  [dbStoreName.OTHER]: {
    key: number;
    value: OtherFormFinalState;
    indexes: { date: number };
  };
  [dbStoreName.REPEAT]: {
    key: number;
    value: RepeatFormFinalState;
  };
}

let clutchDB: IDBPDatabase<ClutchDBSchema>;

export default async function initClutchDB() {
  return (clutchDB = await openDB<ClutchDBSchema>("clutchDB", 1, {
    upgrade(db) {
      db.createObjectStore(dbStoreName.FUEL, { keyPath: "id", autoIncrement: true })
        .createIndex("date", "fuelDate")

      db.createObjectStore(dbStoreName.SERVICE, { keyPath: "id", autoIncrement: true })
        .createIndex("date", "serviceDate");

      db.createObjectStore(dbStoreName.SPARE, { keyPath: "id", autoIncrement: true })
        .createIndex("date", "spareDate");

      db.createObjectStore(dbStoreName.OTHER, { keyPath: "id", autoIncrement: true })
        .createIndex("date", "otherDate");
      
      db.createObjectStore(dbStoreName.REPEAT, { keyPath: "id", autoIncrement: true })
    },
  }));
}

export function getDB() {
  if (!clutchDB) throw new Error("DB access error");
  return clutchDB;
}
