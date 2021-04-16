import { FileDtoModel } from "src/app/lib/data/models";

export class ModalHeaderModel {
  public title = '';
  public color = '';
  constructor() {}
}

export class ModalFooterModel {
  public title = '';
  public color = '';
  constructor() {}
}

export class ModalFileImage {
  public listurl: FileDtoModel[];
  public enityType = '';
  public enityId = '';
  constructor() {}
}
