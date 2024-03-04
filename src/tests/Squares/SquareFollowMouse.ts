import Vector from "../../engine/Vector";
import SquareCollider from "../../engine/defaults/components/Colliders/SquareCollider";
import Square from "../../engine/defaults/objects/Square";
import BoundsRenderer from "../BoundsRenderer";

export default class SquareFollowMouse extends Square{
    private collider: SquareCollider;

    constructor(scale: number){
        super();
        this.transform.localScale = Vector.one.multiply(scale);
        this.collider = new SquareCollider();
    }
    public init(): void {
        super.init();
        this.addComponent(this.collider);
        this.addComponent(new SquareCollider());
        this.addComponent(new BoundsRenderer(this.collider));

        this.transform.localPosition = new Vector(Math.random() * (this.getScene().getCanvasHeight() - 100), Math.random() * (this.getScene().getCanvasWidth() - 100));
        this.collider.onCollisionStay = () => this.renderer.color = "red"
        this.collider.onCollisionExit = () => this.renderer.color = "white"

        document.addEventListener("mousemove", (e) => {
            this.transform.localPosition = new Vector(e.clientX, e.clientY);
        })

        document.addEventListener("click", () => {
            console.log(this.collider.getBounds())
        })

        this.transform.localRotation = Math.PI / 4;

    }
}