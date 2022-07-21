import { FinalFormState } from "../HOC/with-validate-submit/submit-form";
import { getDB } from "./init-db";

export default async function saveToDb<T extends FinalFormState>(
  store: string, value: T, onSuccess: (...args: any[]) => any = () => {}
): Promise<boolean> {
  
  const db = getDB();
  if (!db) throw new Error("DB access error");

  const transaction = db.transaction(store, "readwrite");

  await transaction.store.add(value);
  const result = await transaction.done.then(
    () => {
      onSuccess();
      return true;
    },
    () => {
      return false;
    }
  );

  return result;
}
