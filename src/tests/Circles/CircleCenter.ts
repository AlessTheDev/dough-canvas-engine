import CenterObject from "../../engine/defaults/components/CenterObject";
import CircleCollider from "../../engine/defaults/components/Colliders/CircleCollider"
import Circle from "../../engine/defaults/objects/Circle"

export default class CircleCenter extends Circle{
    private collider: CircleCollider;


    constructor(radious: number){
        super(radious);
        this.collider = new CircleCollider(1);
        
    }
    public init(): void {
        super.init();
        this.addComponent(this.collider);
        this.addComponent(new CenterObject());
        this.collider.onCollisionStay = () => this.renderer!.color = "red"
        this.collider.onCollisionExit = () => this.renderer!.color = "white"

    }

}