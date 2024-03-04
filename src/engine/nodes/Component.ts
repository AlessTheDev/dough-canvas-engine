import EngineNode from "./EngineNode";
import SceneNode from "./SceneNode";

export default abstract class Component extends EngineNode{
    public _init(): void {
        this.init();
    }
    public _update(): void {
        this.update();
    }

    /**
     * Returns the parent as a scene node
     */
    public get parent(): SceneNode{
        return super.parent as SceneNode;
    }

    /**
     * Called when the object is initialized
     */
    public abstract init(): void;
    /**
     * Called every frame
     */
    public abstract update(): void;
}