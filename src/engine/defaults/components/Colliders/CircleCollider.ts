import Vector from "../../../Vector";
import Collider from "./Collider";
import ColliderBounds from "./ColliderBounds";

/**
 * A collider component representing a circle shape.
 * @extends Collider
 */
export default class CircleCollider extends Collider {
    /** The local radius of the circle collider. */
    public localRadius: number;

    /**
     * Gets the radius of the circle collider in world space.
     * @returns The radius of the circle collider in world space.
     */
    public get radius(): number {
        return this.parentTransform.getMinAxisScale() * this.localRadius;
    }

    /**
     * Creates a new CircleCollider instance.
     * @param localRadius The local radius of the circle collider.
     */
    constructor(localRadius: number = 1) {
        super();
        this.localRadius = localRadius;
    }

    /**
     * Gets the bounds of the circle collider.
     * @returns The ColliderBounds object representing the bounds of the circle collider.
     */
    public getBounds(): ColliderBounds {
        return {
            up: Vector.subtract(this.parentTransform.position, Vector.vertical(this.radius)),
            left: Vector.subtract(this.parentTransform.position, Vector.horizontal(this.radius)),
            down: Vector.add(this.parentTransform.position, Vector.vertical(this.radius)),
            right: Vector.add(this.parentTransform.position, Vector.horizontal(this.radius)),
        };
    }

    public update(): void {}
}
