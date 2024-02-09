
export class VirtualElement {

  static xOrigin: number = 150;
  static yOrigin: number = 150;

  private constructor(
    public getBoundingClientRect: () => DOMRect,
    public x: number,
    public y: number,
  ){
    
  }

  static init(): VirtualElement {
    let virtualElement: VirtualElement;

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

    virtualElement = new VirtualElement(
      getBoundingClientRect,
      VirtualElement.xOrigin,
      VirtualElement.yOrigin,
    );
    VirtualElement.incrementOrigin();

    return virtualElement;
  }

  static incrementOrigin() {
    VirtualElement.xOrigin += 20;
    VirtualElement.yOrigin += 20;
  }

  
}
