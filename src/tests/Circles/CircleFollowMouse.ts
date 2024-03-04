import Vector from "../../engine/Vector";
import CircleCollider from "../../engine/defaults/components/Colliders/CircleCollider"
import Circle from "../../engine/defaults/objects/Circle"

export default class CircleFollowMouse extends Circle{
    private collider: CircleCollider;

    constructor(radious: number){
        super(radious);
        this.collider = new CircleCollider(1);
    }
    public init(): void {
        super.init();
        this.addComponent(this.collider);
        this.transform.localPosition = new Vector(Math.random() * (this.getScene().getCanvasHeight() - 100), Math.random() * (this.getScene().getCanvasWidth() - 100));
        this.collider.onCollisionStay = () => this.renderer!.color = "red"
        this.collider.onCollisionExit = () => this.renderer!.color = "white"

        document.addEventListener("mousemove", (e) => {
            this.transform.localPosition = new Vector(e.clientX, e.clientY);
        })

    }

    public update(): void {}
}