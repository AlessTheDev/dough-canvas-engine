import Vector from "../../engine/Vector";
import CenterObject from "../../engine/defaults/components/CenterObject";
import TriangleCollider from "../../engine/defaults/components/Colliders/TriangleCollider";
import Triangle from "../../engine/defaults/objects/Triangle";
import BoundsRenderer from "../BoundsRenderer";

export default class TriangleCenter extends Triangle {
    private collider: TriangleCollider;

    constructor(scale: number) {
        super(scale);
        this.collider = new TriangleCollider();
        this.order = 100;
    }

    public init(): void {
        super.init();
        this.addComponent(this.collider);
        this.addComponent(new CenterObject());
        this.addComponent(new BoundsRenderer(this.collider));
        this.transform.localPosition = new Vector(Math.random() * (this.getScene().getCanvasHeight() - 300), Math.random() * (this.getScene().getCanvasWidth() - 300));
        this.collider.onCollisionStay = () => this.renderer.color = "red"
        this.collider.onCollisionExit = () => this.renderer.color = "white"
    }
}