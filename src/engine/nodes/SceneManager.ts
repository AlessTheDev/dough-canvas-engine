import EngineNode from "./EngineNode";
import Scene from "./Scene";

/**
 * Manages scenes in a game or application, extending the EngineNode class.
 * Allows for assigning and removing scenes, and handles their initialization and updating.
 */
export default class SceneManager extends EngineNode {
    /**
     * Creates an instance of SceneManager.
     */
    constructor() {
        super();
    }

    /**
     * Assigns a scene to the SceneManager, enabling it.
     * @param scene - The scene to be assigned.
     */
    public assignScene(scene: Scene): void {
        this.addSubNode(scene);
        scene.enable();
    }

    /**
     * Removes a scene from the SceneManager, dropping it and removing it from the hierarchy.
     * @param scene - The scene to be removed.
     */
    public removeScene(scene: Scene): void {
        scene.drop();
        this.removeSubNode(scene);
    }

    /**
     * Initializes the SceneManager.
     * This method is not meant to be overridden by subclasses.
     */
    public _init(): void {}

    /**
     * Updates the SceneManager.
     * This method is not meant to be overridden by subclasses.
     */
    public _update(): void {}
}
