import Renderer from "./Renderer";

/**
 * A renderer component that draws an image sprite.
 * @requires Transform
 */
export default class SpriteRenderer extends Renderer {
    private image = new Image();

    /**
     * Gets the source URL of the sprite image.
     * @returns The source URL of the sprite image.
     */
    public get sprite(): string {
        return this.image.src;
    }

    /**
     * Sets the source URL of the sprite image.
     * @param value The source URL of the sprite image.
     */
    public set sprite(value: string) {
        this.image.src = value;
    }

    /**
     * Creates a new SpriteRenderer instance.
     * @param sprite The source URL of the sprite image. Default is "/default-sprite.jpg".
     */
    constructor(sprite: string = "/default-sprite.jpg") {
        super();
        this.image.src = sprite;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.transform.position.x, this.transform.position.y);
        context.rotate(this.transform.rotation);
        
        context.drawImage(
            this.image,
            -this.transform.scale.x / 2,
            -this.transform.scale.y / 2,
            this.transform.scale.x, this.transform.scale.y
        );
        
        context.restore();
    }
}