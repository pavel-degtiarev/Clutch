import { DBSchema, IDBPDatabase, openDB } from "idb";
import { FuelFormFinalState, OtherFormFinalState, ServiceFormFinalState, SpareFormFinalState } from "../HOC/with-validate-check/check-form";

export enum dbStoreName {
  FUEL = "fuel",
  SERVICE = "service",
  SPARE = "spare",
  OTHER = "other",
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
    indexes: { date: number, repeat: number };
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
}

let clutchDB: IDBPDatabase<ClutchDBSchema>;

export default async function initClutchDB() {
  return (clutchDB = await openDB<ClutchDBSchema>("clutchDB", 1, {
    upgrade(db) {
      const fuelDb = db.createObjectStore(dbStoreName.FUEL, { keyPath: "id", autoIncrement: true });
      fuelDb.createIndex("date", "fuelDate")

      const serviceDb = db.createObjectStore(dbStoreName.SERVICE, { keyPath: "id", autoIncrement: true });
      serviceDb.createIndex("date", "serviceDate");
      serviceDb.createIndex("repeat", "serviceRepeat");

      const spareDb = db.createObjectStore(dbStoreName.SPARE, { keyPath: "id", autoIncrement: true });
      spareDb.createIndex("date", "spareDate");

      const otherDb = db.createObjectStore(dbStoreName.OTHER, { keyPath: "id", autoIncrement: true });
        otherDb.createIndex("date", "otherDate");
      
      
    },
  }));
}

export function getDB() {
  if (!clutchDB) throw new Error("DB access error");
  return clutchDB;
}
