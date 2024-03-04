import Vector from "../../engine/Vector";
import SquareCollider from "../../engine/defaults/components/Colliders/SquareCollider";
import Square from "../../engine/defaults/objects/Square";
import BoundsRenderer from "../BoundsRenderer";

export default class MovingSquare extends Square {
    private collider: SquareCollider = new SquareCollider();
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
        this.transform.localPosition = this.transform.localPosition.add(new Vector(this.speed * this.direction, 0));
        if (this.transform.position.x < 0 || this.transform.position.x > this.getScene().getCanvasWidth()) {
            this.direction *= -1;
        }
    }
}