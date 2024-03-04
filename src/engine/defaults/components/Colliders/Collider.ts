import Component from "../../../nodes/Component";
import CollidersManager from "../../../nodes/extensions/CollidersManager";
import Transform from "../Transform";
import ColliderBounds from "./ColliderBounds";

/**
 * Abstract class representing a collider component.
 */
export default abstract class Collider extends Component {
    /** 
     * Gets the CollidersManager instance associated with the collider's parent scene.
     */
    public get manager(): CollidersManager {
        return this.parent.getScene().getExtension(CollidersManager)!;
    }

    /** 
     * Gets the Transform component of the collider's parent object.
     */
    public get parentTransform(): Transform {
        return this.parent.getComponent(Transform)!;
    }

    /** 
     * Initializes the collider component by adding it to the CollidersManager.
     */
    public init(): void {
        this.manager.addCollider(this);
    }

    /** 
     * Abstract method to get the bounds of the collider.
     * @returns The ColliderBounds object representing the bounds of the collider.
     */
    public abstract getBounds(): ColliderBounds;

    /** 
     * Callback function invoked when a collision with another collider is ongoing.
     * Override this method to define custom behavior.
     * @param _collider The collider involved in the ongoing collision.
     */
    public onCollisionStay: Function = (_collider: Collider) => { };

    /** 
     * Callback function invoked when a collision with another collider begins.
     * Override this method to define custom behavior.
     * @param collider The collider involved in the collision.
     */
    public onCollisionEnter: Function = (_collider: Collider) => { };

    /** 
     * Callback function invoked when a collision with another collider ends.
     * Override this method to define custom behavior.
     * @param collider The collider involved in the collision.
     */
    public onCollisionExit: Function = (_collider: Collider) => { };
}
