import { FinalFormState } from "../HOC/with-validate-check/check-form";
import { getDB } from "./init-db";

export default async function saveToDb<T extends FinalFormState>(
  store: string, value: T) {
  
  const db = getDB();
  if (!db) throw new Error("DB access error");

  const transaction = db.transaction(store, "readwrite");

  const key = await transaction.store.add(value);
  const result = { ...value, id: key as number };
  return result;
}
