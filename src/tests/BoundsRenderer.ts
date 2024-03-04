import Collider from "../engine/defaults/components/Colliders/Collider";
import Renderer from "../engine/defaults/components/Renders/Renderer";
import { drawCircle } from "../engine/utils/utils";

export default class BoundsRenderer extends Renderer {
    private collider: Collider;

    constructor(collider: Collider){
        super();
        this.collider = collider;
    }
    draw(context: CanvasRenderingContext2D): void {
        const b = this.collider.getBounds();

        drawCircle(context, b.up.x, b.up.y);
        drawCircle(context, b.down.x, b.down.y);
        drawCircle(context, b.left.x, b.left.y);
        drawCircle(context, b.right.x, b.right.y);
    }
}
