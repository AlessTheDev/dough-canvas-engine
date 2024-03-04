import Vector from "../../Vector"
import Component from "../../nodes/Component";
import Transform from "./Transform";

/**
 * A component that centers its parent object within the canvas by adjusting its local position.
 */
export default class CenterObject extends Component {

    /**
     * Gets the Transform component of the parent object.
     * @returns The Transform component of the parent object.
     * Error if the parent object does not have a Transform component.
     */
    public get transform(): Transform {
        return this.parent.getComponent(Transform)!;
    }

    /**
     * Initializes the CenterObject component.
     * @throws An error if the parent object does not have a Transform component.
     */
    public init(): void {
        if (!this.parent.getComponent(Transform)) {
            throw new Error("This component requires a transform component\nMake sure to add the transform component BEFORE this one");
        }
    }
    
    /**
     * Updates the position of the parent object to center it within the canvas.
     */
    public update(): void {
        if (this.transform.parentTransform) {
            console.warn("Can't center an object with a parent transform");
        }

        this.transform.localPosition = new Vector(
            this.parent.getScene().getCanvasWidth() / 2,
            this.parent.getScene().getCanvasHeight() / 2,
        );
    }

}