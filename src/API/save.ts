import { FinalFormState } from "../utilities/submit-form";
import { getDB } from "./init-db";

export default async function saveToDb(
  store: string, value: FinalFormState, onSuccess?: () => void): Promise<boolean> {
  
	const db = getDB();
	if (!db) throw new Error("DB access error");

	const transaction = db.transaction(store, "readwrite");

	await transaction.store.add(value);
	const result = await transaction.done.then(
		() => {
			onSuccess && onSuccess();
			return true;
		},
		() => {
			return false;
		}
  );
  
  return result;
}
