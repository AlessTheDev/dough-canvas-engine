import Vector from "../../Vector";
import Component from "../../nodes/Component";

/**
 * Represents a transformation component that defines the position, scale, and rotation of an entity.
 */
export default class Transform extends Component {
    /** The local position of the transform relative to its parent. */
    public localPosition: Vector;

    /** The local scale of the transform relative to its parent. */
    public localScale: Vector;

    /** The local rotation of the transform relative to its parent, in radians. */
    public localRotation: number;

    /** The parent transform of this transform, or null if it has no parent. */
    public parentTransform: Transform | null;

    /**
     * Creates a new Transform instance.
     * @param localPosition The local position of the transform relative to its parent. Default is Vector.one.
     * @param localScale The local scale of the transform relative to its parent. Default is Vector.one.
     */
    constructor(localPosition: Vector = Vector.one, localScale: Vector = Vector.one) {
        super();

        this.localPosition = localPosition;
        this.localScale = localScale;
        this.localRotation = 0;

        this.parentTransform = null;
    }
    public init(): void { }
    public update(): void { }

    /**
     * Sets the parent transform of this transform.
     * @param t The parent transform to set.
     */
    public setParentTransform(t: Transform): void {
        this.parentTransform = t;
    }

    /**
     * Gets the world position of the transform.
     * @returns The world position of the transform.
     */
    public get position(): Vector {
        if (!this.parentTransform) return this.localPosition;
        return Vector.add(this.parentTransform.position, this.localPosition);
    }

    /**
     * Gets the world scale of the transform.
     * @returns The world scale of the transform.
     */
    public get scale(): Vector {
        if (!this.parentTransform) return this.localScale;
        return Vector.multiplyVec(this.parentTransform.scale, this.localScale);
    }

    /**
     * Gets the world rotation of the transform.
     * @returns The world rotation of the transform, in radians.
     */
    public get rotation(): number {
        if (!this.parentTransform) return this.localRotation;
        return this.parentTransform.rotation + this.localRotation;
    }

     /**
     * Gets the minimum axis scale of the transform.
     * @returns The minimum axis scale of the transform.
     */
    public getMinAxisScale(): number {
        return Math.min(this.scale.x, this.scale.y);
    }

    /**
     * Rotates the object by an angle
     * @param angle - The angle to add to the localRotation.
     */
    public rotate(angle: number): void {
        this.localRotation += angle;
    }
}