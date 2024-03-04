import Vector from "../../engine/Vector";
import CircleCollider from "../../engine/defaults/components/Colliders/CircleCollider";
import Circle from "../../engine/defaults/objects/Circle";

export default class MovingCircle extends Circle{
    private collider: CircleCollider = new CircleCollider();
    public speed: number;

    private direction: -1 | 1 =1;

    constructor(radius: number, speed: number = 1){
        super(radius);
        this.speed = speed;
    }
    public init(): void {
        super.init();
        this.addComponent(this.collider);

        this.collider.onCollisionStay = () => this.renderer.color = "red";
        this.collider.onCollisionExit = () => this.renderer.color = "white";

        this.transform.rotate(Math.random() * Math.PI * 2);
    }

    public update(): void {
        this.transform.localPosition = this.transform.localPosition.add(new Vector(this.speed * this.direction, 0));
        if(Math.abs(this.transform.position.x) > this.getScene().getCanvasWidth()){
            this.direction *= -1;
        }
    }
}