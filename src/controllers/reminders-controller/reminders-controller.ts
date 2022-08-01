import reminders from "../../mocks/reminders";
import { IReminder } from "../../modules/reminder-item/reminder.types";
import { ClutchStoreType } from "../../store/store";

export class RemindersController {
  private static _instance: RemindersController;

  private _reminders: IReminder[];
  private _store: ClutchStoreType;

  constructor(store: ClutchStoreType) {
    if (!RemindersController._instance) {
      RemindersController._instance = this;
    }

    this._store = store;
    this._reminders = [];

    return RemindersController._instance;
  }

  async init() {
    this._reminders = reminders;
    console.log(this._reminders);
  }

  get reminders() {
    return this._reminders;
  }
}
