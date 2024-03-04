import Component from "./Component";
import EngineNode from "./EngineNode";
import Scene from "./Scene";

/**
 * Represents an abstract class for a scene node, extending the EngineNode class.
 * Scene nodes are used to create hierarchical structures in a scene or game.
 */
export default abstract class SceneNode extends EngineNode {
    /**
     * Creates an instance of SceneNode.
     */
    constructor() {
        super();
    }

    /**
     * Initializes the scene node by initializing its subnodes and calling the custom `init` method.
     * DO NOT OVERRIDE this method in subclasses; instead, implement the `init` method.
     */
    public override _init(): void {
        if (!this.isActive) return;
        this.initSubNodes();
        this.init();
    }

    /**
     * Throws an error if called. Subclasses must implement the custom `update` method.
     * DO NOT OVERRIDE this method in subclasses; instead, implement the `update` method.
     */
    public override _update(): void {
        if (!this.isActive) return;

        this.updateSubNodes();
        this.update();
    }

    /**
     * Initializes the scene node. Implement this method to perform custom initialization.
     * Will be called when the scene is displayed after initializing subNodes.
     */
    public abstract init(): void;

    /**
     * Updates the scene node. Implement this method to define custom update logic.
     * Will be called by the `Scene` class after updateing subNodes
     */
    public abstract update(): void;

    /**
     * Adds a component to the scene node. Components are treated as subnodes in the hierarchy.
     * @param c - The component to add.
     */
    public addComponent(c: Component): void {
        this.addSubNode(c);
        c.order = this.getSubNodes().length;
    }

    /**
     * Returns the component of a SceneNNode
     * @param type - The component type
     * @returns The first instance of that component type
     */
    public getComponent<T extends Component>(type: { new (): T }): T | null {
        const components = this.getSubNodes();
    
        for (let i = 0; i < components.length; i++) {
            if (components[i] instanceof type) {
                return components[i] as T;
            }
        }
        return null;
    }

    /**
     * Returns the scene assigned to this SceneNode
     * @returns The parent as a scene
     */
    public getScene(): Scene{
        return this.parent! as Scene;
    }

    /**
     * Calls onSceneRender on all subnodes
     */
    public onSceneRender(): void {
        const subNodes = this.getSubNodes();
        for(let i = 0; i < subNodes.length; i++){
            subNodes[i].onSceneRender();
        }
    }
}
