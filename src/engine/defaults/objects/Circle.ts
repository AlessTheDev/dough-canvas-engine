import Vector from "../../Vector";
import CircleRenderer from "../components/Renders/CircleRenderer";
import RequireTransform from "./RequireTransform";

/**
 * Circle default object
 * has a CircleRenderer component
 * Make sure to call super.init() if using this class
 * @extends RequireTransform
 */
export default class Circle extends RequireTransform{
    private _renderer: CircleRenderer = new CircleRenderer();
    public get renderer(): CircleRenderer {
        return this._renderer;
    }
    constructor(radius: number){
        super();
        this.transform.localScale = Vector.multiply(Vector.one, radius);
    }

    public init(): void {
        this.addComponent(this.renderer);    
    }

    public update(): void {}
}