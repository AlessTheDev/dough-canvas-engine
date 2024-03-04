import Vector from "../../../Vector";
import ColliderBounds from "./ColliderBounds";
import PolygonCollider from "./PolygonCollider";

/**
 * A collider component representing a triangle shape.
 * @extends PolygonCollider
 */
export default class TriangleCollider extends PolygonCollider {
    /** The base vertices defining the triangle collider. */
    private _baseVertices: Vector[];

    /**
     * Gets the base vertices defining the triangle collider.
     * @returns The base vertices defining the triangle collider.
     */
    public get baseVertices(): Vector[] {
        return this._baseVertices;
    }

    /**
     * Sets the base vertices defining the triangle collider.
     * @param value The base vertices defining the triangle collider.
     */
    public set baseVertices(value: Vector[]) {
        if (value.length < 3) {
            console.error("The triangle collider should have 3 vertices");
        }
        this._baseVertices = value;
        this.vertices = value;
    }

    /**
     * Creates a new TriangleCollider instance.
     * @param baseVertices The base vertices defining the triangle collider. Default is a unit triangle.
     */
    constructor(baseVertices: Vector[] = [
        new Vector(0, -0.5),
        new Vector(-0.5, 0.5),
        new Vector(0.5, 0.5),
    ]) {
        super(baseVertices);
        if (baseVertices.length < 3) {
            console.error("The triangle collider should have 3 vertices");
        }
        this._baseVertices = baseVertices;
    }

    public getBounds(): ColliderBounds {
        const transform = this.parentTransform;

        // Apply scale
        const scale = transform.scale;
        const scaledBounds = {
            up: Vector.multiplyVec(this.vertices[0], scale),
            down: Vector.multiplyVec(this.vertices[1], scale),
            left: Vector.multiplyVec(this.vertices[1], scale),
            right: Vector.multiplyVec(this.vertices[2], scale),
        }

        // Apply rotation
        const rotation = transform.rotation;
        const rotatedBounds = {
            up: scaledBounds.up.rotate(rotation),
            down: scaledBounds.down.rotate(rotation),
            left: scaledBounds.left.rotate(rotation),
            right: scaledBounds.right.rotate(rotation),
        }

        return {
            up: Vector.add(transform.position, rotatedBounds.up),
            left: Vector.add(transform.position, rotatedBounds.left),
            down: Vector.add(transform.position, rotatedBounds.down),
            right: Vector.add(transform.position, rotatedBounds.right),
        };
    }
}
