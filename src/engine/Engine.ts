import SceneManager from "./nodes/SceneManager";

export default class Engine {
    /**
     * The main scene manager assigned to the engine
     */
    public static readonly sceneManager = new SceneManager();

    /**
     * Initializes the engine
     */
    public static init(): void {

    }
}