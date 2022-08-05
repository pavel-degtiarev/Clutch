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
    this._title = "Honda FIT";
  }

  updateTitle(newTitle: string): void {
    this._title = newTitle;
    console.log(this._title);
    this.callback && this.callback();
  }

  setOnUpdateCallback(callback: OnUpdateCallback) {
    this.callback = callback;
  }
}
