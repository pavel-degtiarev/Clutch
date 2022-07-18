import { IDBPDatabase, openDB } from "idb";

let clutchDB: IDBPDatabase<unknown>;

export const dbNames = {
	FUEL: "fuel",
	SERVICE: "service",
	SPARE: "spare",
	OTHER:"other"
}

export async function initClutchDB() {
	clutchDB = await openDB("clutchDB", 1, {
		upgrade(db) {
			db.createObjectStore(dbNames.FUEL, { keyPath: "id", autoIncrement: true });
			db.createObjectStore(dbNames.SERVICE, { keyPath: "id", autoIncrement: true });
			db.createObjectStore(dbNames.SPARE, { keyPath: "id", autoIncrement: true });
			db.createObjectStore(dbNames.OTHER, { keyPath: "id", autoIncrement: true });
		},
	});	
}

export function getDB() {
	return clutchDB;
}
