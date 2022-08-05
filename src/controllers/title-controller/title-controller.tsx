export default class TitleController {
  private static _instance: TitleController;
  private _title: string = "";

  constructor() {
    if (!TitleController._instance) TitleController._instance = this;
    return TitleController._instance;
  }

  get title() { return this._title };

  init() {
    this._title = "Honda FIT";
  };

  updateTitle(newTitle: string): void {
    this._title = newTitle;
  }
}
