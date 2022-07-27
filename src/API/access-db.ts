import { dbStoreName, getDB } from "./init-db";
import { FinalBasicFormsState, FuelFormFinalState, OtherFormFinalState,
  ServiceFormFinalState, SpareFormFinalState } from "../HOC/with-validate-check/check-form";

export async function loadAllFromDb(store: dbStoreName) {
  const transaction = getDB().transaction(store, "readonly");
  return await transaction.store.getAll();
}

export async function loadAllByDateIndex<T extends FinalBasicFormsState>(
  store: dbStoreName, loverIndex: number, upperIndex: number ): Promise<T[]> {
  const transaction = getDB().transaction(store, "readonly");
  const dataRange = await transaction.store.index("date")
    .getAll(IDBKeyRange.bound(loverIndex, upperIndex, true, true));
  return dataRange as T[];
}

export async function loadFirstByDateIndex<T extends FinalBasicFormsState>(
  store: dbStoreName, loverIndex: number, upperIndex: number ): Promise<T> {
  const transaction = getDB().transaction(store, "readonly");
  const dataRange = await transaction.store.index("date")
    .get(IDBKeyRange.bound(loverIndex, upperIndex, true, true));
  return dataRange as T;
}

export async function saveToDb<T extends FinalBasicFormsState>(store: dbStoreName, value: T) {
  const transaction = getDB().transaction(store, "readwrite");
  const key = await transaction.store.add(value);
  const result = { ...value, id: key as number };
  return result;
}

export async function getOldestDate(store: dbStoreName): Promise<number> {
  const transaction = getDB().transaction(store, "readonly");
  const oldest = await transaction.store.index("date").get(IDBKeyRange.lowerBound(0));

  if(!oldest) return 0;
  
  switch (store) {
    case dbStoreName.FUEL:
      return (oldest as FuelFormFinalState).fuelDate;
    case dbStoreName.OTHER:
      return (oldest as OtherFormFinalState).otherDate;
    case dbStoreName.SERVICE:
      return (oldest as ServiceFormFinalState).serviceDate;
    case dbStoreName.SPARE:
      return (oldest as SpareFormFinalState).spareDate;
  }
}
