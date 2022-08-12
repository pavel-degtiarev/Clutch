import { DBSchema, deleteDB, IDBPDatabase, IndexNames, openDB, StoreValue } from "idb";
import { FuelFormFinalState, OtherFormFinalState, RepeatFormFinalState,
  ServiceFormFinalState, SpareFormFinalState } from "../HOC/with-validate-check/check-form";

const CLUTCH_DB_NAME = "clutchDB";

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
    indexes: { serviceId: number };
  };
}

type IndexName<T extends dbStoreName> = IndexNames<ClutchDBSchema, T>;
type IndexField<T extends dbStoreName> = keyof StoreValue<ClutchDBSchema, T>;

let clutchDB: IDBPDatabase<ClutchDBSchema>;

export default async function initClutchDB() {
  return (clutchDB = await openDB<ClutchDBSchema>(CLUTCH_DB_NAME, 1, {
    upgrade(db) {
      createDbStore(dbStoreName.FUEL, "date", "fuelDate");
      createDbStore(dbStoreName.SERVICE, "date", "serviceDate");
      createDbStore(dbStoreName.SPARE, "date", "spareDate");
      createDbStore(dbStoreName.OTHER, "date", "otherDate");
      createDbStore(dbStoreName.REPEAT, "serviceId", "serviceId");

      function createDbStore<T extends dbStoreName>(
        dbName: T, indexName: IndexName<T>, indexField: IndexField<T>) {
        if (!db.objectStoreNames.contains(dbName)) {
          const store = db.createObjectStore(dbName, { keyPath: "id", autoIncrement: true });
          store.createIndex(indexName, indexField as string);
        }
      }
    },
  }));
}

export function getDB() {
  if (!clutchDB) throw new Error("DB access error");
  return clutchDB;
}

export async function deleteClutchDb() {
  clutchDB.close();
  await deleteDB(CLUTCH_DB_NAME);
}
