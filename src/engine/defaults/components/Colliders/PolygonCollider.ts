import Vector from "../../../Vector";
import Collider from "./Collider";
import ColliderBounds from "./ColliderBounds";

/**
 * A collider component representing a polygon shape.
 * @extends Collider.
 */
export default class PolygonCollider extends Collider {
    //#region Vertices
    /** The vertices defining the polygon collider in local space. */
    private _vertices: Vector[] = [];

    /**
     * Gets the vertices defining the polygon collider in local space.
     * @returns The vertices defining the polygon collider.
    */
    public get vertices(): Vector[] {
        return this._vertices;
    }

    /**
     * Gets the vertices of the polygon collider transformed to world space.
     * @returns An array of vertices representing the polygon collider in world space.
     */
    public get worldVertices(): Vector[] {
        const worldVertices: Vector[] = [];
        const parentPosition = this.parentTransform.position;
        const parentScale = this.parentTransform.scale;
        const parentRotation = this.parentTransform.rotation;


        for (const vertex of this.vertices) {
            let worldVertex = Vector.multiplyVec(vertex, parentScale);
            worldVertex = worldVertex.rotate(parentRotation);
            worldVertex = Vector.add(parentPosition, worldVertex);
            worldVertices.push(worldVertex);
        }

        return worldVertices;
    }

    /**
     * Gets the vertices defining the polygon collider in local space.
     * @returns The vertices defining the polygon collider.
     */
    public set vertices(value: Vector[]) {
        this._vertices = value;
    }

    //#endregion

    /**
     * Creates a new PolygonCollider instance.
     * @param vertices The vertices defining the polygon collider in local space. Default is an empty array.
     */
    constructor(vertices: Vector[] = []) {
        super();
        this.vertices = vertices;
    }

    /**
     * Gets the bounding points of the polygon collider in world space.
     * @returns The bounding points of the polygon collider in world space.
     */
    public getBounds(): ColliderBounds {
        if (this.vertices.length === 0) {
            return {
                up: Vector.zero,
                down: Vector.zero,
                left: Vector.zero,
                right: Vector.zero,
            };
        }

        let vertices = this.worldVertices;

        const bounds: {
            up: Vector | null,
            down: Vector | null,
            left: Vector | null,
            right: Vector | null
        } = {
            up: null,
            down: null,
            left: null,
            right: null
        };

        for (const vertex of vertices) {
            if (!bounds.left || vertex.x < bounds.left.x) {
                bounds.left = vertex;
            }
            if (!bounds.right || vertex.x > bounds.right.x) {
                bounds.right = vertex;
            }
            if (!bounds.down || vertex.y > bounds.down.y) {
                bounds.down = vertex;
            }
            if (!bounds.up || vertex.y < bounds.up.y) {
                bounds.up = vertex;
            }
        }

        return bounds as ColliderBounds;
    }

    /**
     * Calculates and returns the normals of the edges of the polygon collider.
     * @returns An array of normals representing the edges of the polygon collider.
     */
    public getNormals(): Vector[] {
        const normals: Vector[] = [];

        const verts = this.worldVertices;

        for (let i = 0; i < verts.length; i++) {
            const p1: Vector = verts[i]; // Current vertex
            const p2: Vector = verts[i + 1 == verts.length ? 0 : i + 1]; // Current vertex

            const edge = Vector.subtract(p1, p2);

            normals.push(new Vector(-edge.y, edge.x));
        }
        return normals;
    }

    public update(): void { }

}
