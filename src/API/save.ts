import { FinalFormState } from "../utilities/submit-form";
import { getDB } from "./init-db";

export default async function saveToDb(
	store: string,
	value: FinalFormState,
	// onSuccess: Function
): Promise<void> {
	const db = getDB();
	const transaction = db.transaction(store, "readwrite");

	const result = await transaction.store.add(value);

	console.log(result);
}
