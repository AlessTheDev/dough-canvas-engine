import Vector from "../../engine/Vector";
import CenterObject from "../../engine/defaults/components/CenterObject";
import SquareCollider from "../../engine/defaults/components/Colliders/SquareCollider";
import Square from "../../engine/defaults/objects/Square";

export default class SquareCenter extends Square{
    private collider: SquareCollider;

    constructor(scale: number){
        super();
        this.transform.localScale = Vector.one.multiply(scale);
        this.collider = new SquareCollider();
    }

    public init(): void {
        super.init();
        this.addComponent(this.collider);
        this.addComponent(new CenterObject());
        this.transform.localPosition = new Vector(Math.random() * (this.getScene().getCanvasHeight() - 300), Math.random() * (this.getScene().getCanvasWidth() - 300));
        this.collider.onCollisionStay = () => this.renderer.color = "red"
        this.collider.onCollisionExit = () => this.renderer.color = "white"

       

    }
}