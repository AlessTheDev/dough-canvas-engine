import Vector from "../../../Vector";
import PolygonCollider from "./PolygonCollider";

/**
 * A collider component representing a square shape.
 * @extends PolygonCollider
 */
export default class SquareCollider extends PolygonCollider {
    /** The base vertices defining the square collider. */
    private _baseVertices: Vector[];

    /**
     * Gets the base vertices defining the square collider.
     * @returns The base vertices defining the square collider.
     */
    public get baseVertices(): Vector[] {
        return this._baseVertices;
    }

    /**
     * Sets the base vertices defining the square collider.
     * @param value The base vertices defining the square collider.
     */
    public set baseVertices(value: Vector[]) {
        if (value.length < 4) {
            console.error("The square collider should have 4 vertices");
        }
        this._baseVertices = value;
        this.vertices = value;
    }

    /**
     * Creates a new SquareCollider instance.
     * @param baseVertices The base vertices defining the square collider. Default is a unit square.
     */
    constructor(baseVertices: Vector[] = [
        new Vector(0.5, -0.5),
        new Vector(0.5, 0.5),
        new Vector(-0.5, 0.5),
        new Vector(-0.5, -0.5),
    ]) {
        super(baseVertices);
        if (baseVertices.length < 4) {
            console.error("The square collider should have 4 vertices");
        }
        this._baseVertices = baseVertices;
    }
}
