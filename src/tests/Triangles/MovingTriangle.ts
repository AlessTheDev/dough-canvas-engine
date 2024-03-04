import Vector from "../../engine/Vector";
import TriangleCollider from "../../engine/defaults/components/Colliders/TriangleCollider";
import Triangle from "../../engine/defaults/objects/Triangle";
import BoundsRenderer from "../BoundsRenderer";

export default class MovingTriangle extends Triangle {
    private collider: TriangleCollider = new TriangleCollider();
    public speed: number;

    private direction: -1 | 1 = 1;


    constructor(size: number, speed: number = 1) {
        super(size);
        this.speed = speed;
    }
    public init(): void {
        super.init();
        this.addComponent(this.collider);
        this.addComponent(new BoundsRenderer(this.collider));

        this.collider.onCollisionStay = () => this.renderer.color = "red";
        this.collider.onCollisionExit = () => this.renderer.color = "white";

        this.transform.rotate(Math.random() * Math.PI * 2);
    }

    public update(): void {
        super.update();
        this.transform.localPosition = this.transform.localPosition.add(new Vector(this.speed * this.direction, 0));
        if (Math.abs(this.transform.position.x) > this.getScene().getCanvasWidth()) {
            this.direction *= -1;
        }
    }
}