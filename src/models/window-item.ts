
import { v4 as uuidv4 } from 'uuid';

import { VirtualElement } from './virtual-element';


const DEFAULT_WINDOW_WIDTH = 200;
const DEFAULT_WINDOW_HEIGHT = 150;

type WindowItemParams = {
  key: string;
  title: string;
  content?: WindowItem['content'];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export class WindowItem {
  public id: string;
  public virtualElement: VirtualElement;
  public layer: number = -1;
  public width: number = DEFAULT_WINDOW_WIDTH;
  public height: number = DEFAULT_WINDOW_HEIGHT;
  public content?: React.FC;
  private constructor(
    public key: string,
    public title: string,
    content?: React.FC,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  ){
    this.id = uuidv4();
    this.virtualElement = VirtualElement.init({
      x,
      y,
    });
    // this.layer = layer || -1;
    this.content = content;
    this.width = width ?? DEFAULT_WINDOW_WIDTH;
    this.height = height ?? DEFAULT_WINDOW_HEIGHT;
  }

  static init(windowItemParams: WindowItemParams) {
    let windowItem: WindowItem;

    windowItem = new WindowItem(
      windowItemParams.key,
      windowItemParams.title,
      windowItemParams.content,
      windowItemParams.x,
      windowItemParams.y,
      windowItemParams.width,
      windowItemParams.height,
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
