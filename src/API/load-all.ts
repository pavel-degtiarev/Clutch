import { dbStoreName, getDB } from "./init-db";

export default async function loadAllFromDb(store: dbStoreName) {
  const db = getDB();
  if (!db) throw new Error("DB access error");

  const transaction = db.transaction(store, "readonly");
  return await transaction.store.getAll();  
}
