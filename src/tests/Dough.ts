import Vector from "../engine/Vector";
import Sprite from "../engine/defaults/objects/Sprite";

export default class Dough extends Sprite {
    constructor() {
        super("default-sprite.jpg");
        this.transform.localScale = new Vector(100, 100);
    }

    public init(): void {
        super.init();

    }

    public update(): void {
        this.transform.localPosition = this.transform.localPosition.add(new Vector(1, 1));
    }
}