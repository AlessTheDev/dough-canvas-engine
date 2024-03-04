import Component from "../../../nodes/Component";
import Transform from "../Transform";

/**
 * An abstract base class for rendering components.
 */
export default abstract class Renderer extends Component {
    /**
     * Gets the Transform component of the parent object.
     * @returns The Transform component of the parent object.
     * Error if the parent object does not have a Transform component.
     */
    public get transform(): Transform {
        return this.parent.getComponent(Transform)!;
    }

    /**
     * Initializes the Renderer component.
     * Sets the rendering order to a default value of -99.
     */
    public init(): void {
        this.order = -99;
    }

    /** 
     * Updates the Renderer component.
     */
    public update(): void { }

    /**
     * Called when the scene is being rendered (on engine-tick).
     * Draws the rendering output using the canvas rendering context.
     */
    public onSceneRender(): void {
        this.draw(this.parent.getScene().context);
    }

    /**
     * Abstract method to be implemented by subclasses.
     * Draws the rendering output using the canvas rendering context.
     * @param context The CanvasRenderingContext2D to draw on.
     */
    abstract draw(context: CanvasRenderingContext2D): void;
}
