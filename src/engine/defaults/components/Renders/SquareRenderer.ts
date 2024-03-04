import Renderer from "./Renderer";

/**
 * A renderer component that draws a square shape.
 * @requires Transform
 */
export default class SquareRenderer extends Renderer {
    public color: string = "white";

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;

        context.save();
        context.translate(this.transform.position.x, this.transform.position.y);
        context.rotate(this.transform.rotation);

        context.fillRect(
            -this.transform.scale.x / 2,
            -this.transform.scale.y / 2,
            this.transform.scale.x,
            this.transform.scale.y
        );

        context.restore();
    }
}
