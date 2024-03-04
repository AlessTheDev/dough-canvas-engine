import Transform from "../components/Transform";
import SceneNode from "../../nodes/SceneNode";

/**
 * Automatically adds a transform component
 */
export default abstract class RequireTransform extends SceneNode {
    private _transform: Transform;

    public get transform(): Transform {
        return this._transform;
    }

    constructor() {
        super();
        this._transform = new Transform();
        this.addComponent(this.transform);
    }
}