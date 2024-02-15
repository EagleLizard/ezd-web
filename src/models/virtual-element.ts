

type VirtualElementParams = {
  x?: number;
  y?: number;
};

export class VirtualElement {

  static xOrigin: number = 150;
  static yOrigin: number = 50;

  private constructor(
    public getBoundingClientRect: () => DOMRect,
    public x: number,
    public y: number,
  ){
    
  }

  static init(virtualElementParams: VirtualElementParams): VirtualElement {
    let virtualElement: VirtualElement;
    let x: number;
    let y: number;

    let getBoundingClientRect = function (this: VirtualElement) {
      // console.log(this);
      return {
        width: 0,
        height: 0,
        top: this.y,
        right: this.x,
        bottom: this.y,
        left: this.x,
        x: this.x,
        y: this.y,
        toJSON: () => '',
      };
    }

    if(virtualElementParams.x === undefined) {
      x = this.xOrigin;
      VirtualElement.incrementOriginX();
    } else {
      x = virtualElementParams.x;
    }
    if(virtualElementParams.y === undefined) {
      y = this.yOrigin;
      VirtualElement.incrementOriginY();
    } else {
      y = virtualElementParams.y;
    }

    virtualElement = new VirtualElement(
      getBoundingClientRect,
      x,
      y,
    );

    return virtualElement;
  }

  static incrementOriginX() {
    VirtualElement.xOrigin += 10;
  }
  static incrementOriginY() {
    VirtualElement.yOrigin += 10;
  }
  // static incrementOrigin() {
  //   VirtualElement.incrementOriginX();
  //   VirtualElement.incrementOriginY();
  // }

  
}
