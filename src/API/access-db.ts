import { dbStoreName, getDB } from "./init-db";
import { FinalFormState } from "../HOC/with-validate-check/check-form";

export async function loadAllFromDb(store: dbStoreName) {
  const db = getDB();
  if (!db) throw new Error("DB access error");

  const transaction = db.transaction(store, "readonly");
  return await transaction.store.getAll();
}

export async function saveToDb<T extends FinalFormState>(store: string, value: T) {
  const db = getDB();
  if (!db) throw new Error("DB access error");

  const transaction = db.transaction(store, "readwrite");

  const key = await transaction.store.add(value);
  const result = { ...value, id: key as number };
  return result;
}
