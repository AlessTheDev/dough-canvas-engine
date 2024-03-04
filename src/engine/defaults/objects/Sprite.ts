import SpriteRenderer from "../components/Renders/SpriteRenderer";
import RequireTransform from "./RequireTransform";

/**
 * Sprite default object
 * has a SpriteRenderer component
 * Make sure to call super.init() if using this class
 * @extends RequireTransform
 */
export default class Sprite extends RequireTransform {
    public spriteRenderer: SpriteRenderer;

    /**
     * Sprite object constructor
     * @param sprite the image source
     */
    constructor(sprite: string | undefined = undefined) {
        super();
        this.spriteRenderer = new SpriteRenderer(sprite);
    }
    public init(): void {
        this.addComponent(this.spriteRenderer);
    }
    public update(): void { }
}