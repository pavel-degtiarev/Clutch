import { getTitleFromLS, initLocalStorage, removeTitleFromLS, setTitleToLS } from "../../API/local-storage";

export default class TitleController {
  private static _instance: TitleController;
  private _title: string = "";
  callback: OnUpdateCallback = null;

  constructor() {
    if (!TitleController._instance) TitleController._instance = this;
    return TitleController._instance;
  }

  get title() { return this._title };

  init() {
    initLocalStorage();
    this._title = getTitleFromLS();
  }

  clearTitle() {
    removeTitleFromLS();
    this._title = "";
    this.callback && this.callback();
  }

  updateTitle(newTitle: string): void {
    this._title = newTitle;
    setTitleToLS(this._title);
    this.callback && this.callback();
  }

  setOnUpdateCallback(callback: OnUpdateCallback) {
    this.callback = callback;
  }
}
