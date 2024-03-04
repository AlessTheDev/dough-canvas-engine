import Vector from "../../Vector";
import TriangleRenderer from "../components/Renders/TriangleRenderer";
import RequireTransform from "./RequireTransform";

/**
 * Triangle default object
 * has a TriangleRenderer component
 * Make sure to call super.init() if using this class
 * @extends RequireTransform
 */
export default class Triangle extends RequireTransform {
    private _renderer: TriangleRenderer = new TriangleRenderer();
    public get renderer(): TriangleRenderer {
        return this._renderer;
    }
    constructor(size: number = 1) {
        super();
        this.transform.localScale = Vector.multiply(Vector.one, size);
    }

    public init(): void {
        this.addComponent(this.renderer);
    }

    public update(): void { }
}