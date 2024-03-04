import Renderer from "./Renderer";

/**
 * A renderer component that draws a circle.
 * @requires Transform
 */
export default class CircleRenderer extends Renderer{
    public color: string = "white";

    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.transform.position.x, this.transform.position.y);
        context.rotate(this.transform.rotation);

        context.beginPath();
        context.arc(0, 0, this.transform.scale.x, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();

        context.restore();
    }
}
