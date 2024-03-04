import EngineNode from "./EngineNode";
import SceneNode from "./SceneNode";

/**
 * Class to create extensions for a scene, extensions are called before every object and can perform various operations
 */
export default abstract class SceneExtension extends EngineNode{
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
     * Called when the extension is initialized
     */
    public abstract init(): void;
    /**
     * Called every frame
     */
    public abstract update(): void;
}