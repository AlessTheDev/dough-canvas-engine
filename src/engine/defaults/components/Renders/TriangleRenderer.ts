import Renderer from "./Renderer";

/**
 * A renderer component that draws a triangle shape.
 * @requires Transform
 */
export default class TriangleRenderer extends Renderer {
    public color: string = "white";

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;

        context.save();
        context.translate(this.transform.position.x, this.transform.position.y);
        context.rotate(this.transform.rotation);

        const halfScaleX = this.transform.scale.x / 2;
        const halfScaleY = this.transform.scale.y / 2;
        context.beginPath();
        context.moveTo(-halfScaleX, halfScaleY);
        context.lineTo(halfScaleX, halfScaleY);
        context.lineTo(0, -halfScaleY);
        context.fill();

        context.restore();
    }
}
