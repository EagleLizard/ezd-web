
import { v4 as uuidv4 } from 'uuid';

import { VirtualElement } from './virtual-element';

export class WindowItem {
  public id: string;
  public virtualElement: VirtualElement;
  private constructor(
    public key: string,
    public title: string,
    public content?: React.FC,
  ){
    this.id = uuidv4();
    this.virtualElement = VirtualElement.init();
  }

  static init(
    key: string,
    title: string,
    content?: WindowItem['content'],
  ) {
    let windowItem: WindowItem;

    windowItem = new WindowItem(
      key,
      title,
      content,
    );

    return windowItem;
  }
  set x(val: number) {
    this.virtualElement.x = val;
  }
  get x(): number {
    return this.virtualElement.x;
  }
  set y(val: number) {
    this.virtualElement.y = val;
  }
  get y(): number {
    return this.virtualElement.y;
  }
}
