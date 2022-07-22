import { IDBPDatabase, openDB } from "idb";

let clutchDB: IDBPDatabase<unknown>;

export enum dbStoreName {
  FUEL = "fuel",
  SERVICE = "service",
  SPARE = "spare",
  OTHER = "other",
}

export default async function initClutchDB() {
  return (clutchDB = await openDB("clutchDB", 1, {
    upgrade(db) {
      db.createObjectStore(dbStoreName.FUEL, { keyPath: "id", autoIncrement: true })
        .createIndex("date", "fuelDate");

      db.createObjectStore(dbStoreName.SERVICE, { keyPath: "id", autoIncrement: true })
        .createIndex("date", "serviceDate");

      db.createObjectStore(dbStoreName.SPARE, { keyPath: "id", autoIncrement: true })
        .createIndex("date", "spareDate");

      db.createObjectStore(dbStoreName.OTHER, { keyPath: "id", autoIncrement: true })
        .createIndex("date", "otherDate");
    },
  }));
}

export function getDB() {
  return clutchDB;
}
