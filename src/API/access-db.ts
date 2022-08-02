import { dbStoreName, getDB } from "./init-db";
import { FinalBasicFormsState, FuelFormFinalState, OtherFormFinalState,
  ServiceFormFinalState, SpareFormFinalState } from "../HOC/with-validate-check/check-form";

export async function loadAllFromDb(store: dbStoreName) {
  const transaction = getDB().transaction(store, "readonly");
  return await transaction.store.getAll();
}

export async function loadAllByDateIndex<T extends FinalBasicFormsState>(
  store: dbStoreName, loverIndex: number, upperIndex: number): Promise<T[]> {
  // в repeatDb нет индекса date,
  // поэтому возвращаем пустую заглушку во всех функциях
  if (store === dbStoreName.REPEAT) return [] as T[];
  const transaction = getDB().transaction(store, "readonly");
  const dataRange = await transaction.store.index("date")
    .getAll(IDBKeyRange.bound(loverIndex, upperIndex));
  return dataRange as T[];
}

export async function loadFirstByDate<T extends FinalBasicFormsState>(
  store: dbStoreName, loverIndex: number, upperIndex: number): Promise<T> {
  if (store === dbStoreName.REPEAT) return {} as T;
  const transaction = getDB().transaction(store, "readonly");
  const dataRange = await transaction.store.index("date")
    .get(IDBKeyRange.bound(loverIndex, upperIndex));
  return dataRange as T;
}

export async function loadById<T extends FinalBasicFormsState>(
  store: dbStoreName, id: number): Promise<T> {
  const transaction = getDB().transaction(store, "readonly");
  const data = await transaction.store.get(IDBKeyRange.only(id));
  return data as T;
}

export async function loadNearestBoundingDates<T extends FinalBasicFormsState>(
  store: dbStoreName, date: number): Promise<T[]>{
  if (store === dbStoreName.REPEAT) return [] as T[];
  const transaction = getDB().transaction(store, "readonly");
  const [lowerArray, upperRawValue] = await Promise.all([
    transaction.store.index("date").getAll(IDBKeyRange.bound(0, date)),
    transaction.store.index("date").get(IDBKeyRange.lowerBound(date)),
  ]);

  const lower = lowerArray.length === 0 ? null : lowerArray[lowerArray.length-1];
  const upper = upperRawValue === undefined ? null : upperRawValue;
  return [lower, upper] as T[];
};

export async function getNewestRecord<T extends FinalBasicFormsState>(
  store: dbStoreName): Promise<T> {
  if (store === dbStoreName.REPEAT) return {} as T;
  const transaction = getDB().transaction(store, "readonly");
  const cursor = await transaction.store.index("date").openCursor(null, "prev");  
  return cursor ? cursor.value as T : {} as T;
}

export async function getOldestDate(store: dbStoreName): Promise<number> {
  if (store === dbStoreName.REPEAT) return 0;
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

export async function saveToDb<T extends FinalBasicFormsState>(store: dbStoreName, value: T) {
  const transaction = getDB().transaction(store, "readwrite");
  const key = await transaction.store.add(value);
  const result = { ...value, id: key as number };
  return result;
}
