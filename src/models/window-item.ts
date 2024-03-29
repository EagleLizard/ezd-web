
import { v4 as uuidv4 } from 'uuid';

import { VirtualElement } from './virtual-element';

export const BASE_Z_INDEX = 1;

const DEFAULT_WINDOW_WIDTH = 200;
const DEFAULT_WINDOW_HEIGHT = 150;

export type WindowItemParams = {
  key: string;
  title: string;
  content?: WindowItem['content'];
  layer?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export class WindowItem {
  public key: string;
  public title: string;
  public id: string;
  public virtualElement: VirtualElement;
  public content?: React.FC;
  public layer: number;
  public width: number = DEFAULT_WINDOW_WIDTH;
  public height: number = DEFAULT_WINDOW_HEIGHT;
  public minimized: boolean = false;
  constructor(params: WindowItemParams) {
    const {
      key,
      title,
      content,
      layer,
      x,
      y,
      width,
      height
    } = params;
    this.key = key;
    this.title = title;
    this.id = uuidv4();
    this.virtualElement = VirtualElement.init({
      x,
      y,
    });
    this.layer = layer || -1;
    this.content = content;
    this.width = width ?? DEFAULT_WINDOW_WIDTH;
    this.height = height ?? DEFAULT_WINDOW_HEIGHT;
  }

  static init(windowItemParams: WindowItemParams) {
    let windowItem: WindowItem;

    windowItem = new WindowItem({
      key: windowItemParams.key,
      title: windowItemParams.title,
      content: windowItemParams.content,
      layer: windowItemParams.layer,
      x: windowItemParams.x,
      y: windowItemParams.y,
      width: windowItemParams.width,
      height: windowItemParams.height,
    });

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
