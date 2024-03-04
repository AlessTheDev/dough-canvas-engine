import Vector from "../../Vector";
import SquareRenderer from "../components/Renders/SquareRenderer";
import RequireTransform from "./RequireTransform";

/**
 * Default square object
 * Has a transform and a SquareRenderer
 * Make sure to call super.init() if using this class
 * @extends RequireTransform
 */
export default class Square extends RequireTransform{
    private _renderer: SquareRenderer = new SquareRenderer();
    public get renderer(): SquareRenderer {
        return this._renderer;
    }

    constructor(size: number = 1){
        super();
        this.transform.localScale = Vector.multiply(Vector.one, size);
    }

    public init(): void {
        this.addComponent(this.renderer);    
    }

    public update(): void {}
}