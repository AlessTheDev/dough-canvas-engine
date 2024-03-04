import Vector from "../../Vector";
import CircleCollider from "../../defaults/components/Colliders/CircleCollider";
import Collider from "../../defaults/components/Colliders/Collider";
import Collision from "../../defaults/components/Colliders/Collision";
import CollisionsSet from "../../defaults/components/Colliders/CollisionsSet";
import PolygonCollider from "../../defaults/components/Colliders/PolygonCollider";
import SceneExtension from "../SceneExtension";

/**
 * Represents a range projection along an axis.
 */
class Projection {
    private _min: number;
    public get min(): number {
        return this._min;
    }
    private _max: number;
    public get max(): number {
        return this._max;
    }

    /**
    * Creates a new Projection instance.
    * @param min The minimum value of the projection.
    * @param max The maximum value of the projection.
    */
    constructor(min: number, max: number) {
        this._min = min;
        this._max = max;
    }

    /**
     * Checks if this projection overlaps with another projection.
     * @param p The projection to compare against.
     * @returns True if there is an overlap, false otherwise.
     */
    public overlap(p: Projection): boolean {
        const leftP = this.min < p.min ? this : p;
        const rightP = leftP == this ? p : this;
        return rightP.min < leftP.max;
    }
}

/**
 * Manages collisions between colliders in a scene.
 */
export default class CollidersManager extends SceneExtension {
    private colliders: Collider[] = [];
    private previousCollisions: CollisionsSet = new CollisionsSet();
    private currentCollisions: CollisionsSet = new CollisionsSet();

    private areAllCircles = true; // This variable alow to skip some if statements

    /**
     * Adds a collider to the manager.
     * @param c The collider to add.
     */
    public addCollider(c: Collider) {
        this.colliders.push(c);
        if (!(c instanceof CircleCollider)) this.areAllCircles = false;
    }

    /**
     * Initializes the colliders manager.
     */
    public init(): void {
        this.previousCollisions = new CollisionsSet();
        this.currentCollisions = new CollisionsSet();
        this.colliders = [];

        this.areAllCircles = true;
    }

    /**
     * Updates the colliders manager, checking for collisions.
     */
    public update(): void {
        this.previousCollisions = this.currentCollisions.clone();
        this.currentCollisions.clear();

        this.colliders.sort((a, b) => a.parentTransform.position.x - b.parentTransform.position.x);
        this.sweepAndPruneCheck();
        this.handleCollisionEvents();
    }

    private sweepAndPruneCheck() {
        // Iterate other the colliders
        for (let i = 0; i < this.colliders.length; i++) {
            for (let k = i + 1; k < this.colliders.length; k++) {
                const collision = new Collision(this.colliders[i], this.colliders[k]);
                if (collision.couldBeColliding()) {
                    let col1 = this.colliders[i];
                    let col2 = this.colliders[k];

                    // Check if they are both circles
                    if (this.areAllCircles || (col1 instanceof CircleCollider && col2 instanceof CircleCollider)) {
                        const c1 = col1 as CircleCollider;
                        const c2 = col2 as CircleCollider;
                        if (Vector.distance(c1.parentTransform.position, c2.parentTransform.position) < c1.radius + c2.radius) {
                            this.currentCollisions.add(collision);
                        }

                    } else if (col1 instanceof PolygonCollider && col2 instanceof PolygonCollider) { // Check if they are both polygons
                        const c1 = this.colliders[i] as PolygonCollider;
                        const c2 = this.colliders[k] as PolygonCollider;
                        if (this.areCollidingPolygonPolygon(c1, c2)) {
                            this.currentCollisions.add(collision);
                        }
                    } else { // Mixed
                        const c1 = (col1 instanceof PolygonCollider ? col1 : col2) as PolygonCollider;
                        const c2 = (col1 === c1 ? col2 : col1) as CircleCollider;
                        if (this.areCollidingPolygonCircle(c1, c2)) {
                            this.currentCollisions.add(collision);
                        }
                    }
                }
            }
        }
    }

    /**
     * Handles collision events based on current collisions.
     */
    private handleCollisionEvents() {
        for (const collision of this.currentCollisions) {
            if (!this.previousCollisions.has(collision)) {
                collision.notifyOnCollisionEnter();
            } else {
                collision.notifyOnCollisionStay();
            }
        }

        for (const collision of this.previousCollisions) {
            if (!this.currentCollisions.has(collision)) {
                collision.notifyOnCollisionExit();
            }
        }
    }


    /**
     * Checks if two polygons are colliding.
     * @param c1 The first polygon collider.
     * @param c2 The second polygon collider.
     * @returns True if the polygons are colliding, false otherwise.
     */
    private areCollidingPolygonPolygon(c1: PolygonCollider, c2: PolygonCollider): boolean {
        const axes1 = c1.getNormals();
        const axes2 = c2.getNormals();

        //console.log(axes1);

        // Check for overlap on all axes of the first polygon
        for (const axis of axes1) {
            const p1 = this.project(c1, axis);
            const p2 = this.project(c2, axis);

            if (!p1.overlap(p2)) {
                return false; // Separating axis found
            }
        }

        // Check for overlap on all axes of the second polygon
        for (const axis of axes2) {
            const p1 = this.project(c1, axis);
            const p2 = this.project(c2, axis);

            if (!p1.overlap(p2)) {
                return false; // Separating axis found
            }
        }

        // No separating axis found, polygons are colliding
        return true;
    }


    /**
     * Projects a shape onto an axis and returns the projection.
     * @param shape The polygon collider to project.
     * @param axis The axis to project onto.
     * @returns The projection of the shape onto the axis.
     */
    private project(shape: PolygonCollider, axis: Vector): Projection {
        let min = Vector.dot(axis, shape.worldVertices[0]);
        let max = min;

        const verts = shape.worldVertices;
        for (let i = 1; i < verts.length; i++) {
            const p = Vector.dot(axis, verts[i]);

            if (p < min) {
                min = p;
            } else if (p > max) {
                max = p;
            }
        }

        return new Projection(min, max);

    }

    /**
     * Checks if a polygon and a circle are colliding.
     * @param c1 The polygon collider.
     * @param c2 The circle collider.
     * @returns True if the polygon and circle are colliding, false otherwise.
     */
    private areCollidingPolygonCircle(c1: PolygonCollider, c2: CircleCollider): boolean {
        // Find closest vert to cicle
        const verts = c1.worldVertices;
        let min = verts[0];
        let minDist = Vector.distance(c2.parentTransform.position, min);


        for (let i = 1; i < verts.length; i++) {
            if (Vector.distance(verts[i], c2.parentTransform.position) < minDist) {
                min = verts[i];
            }
        }

        // Check circle axis
        const deltaVector: Vector = Vector.subtract(min, c2.parentTransform.position);
        const circleAxis: Vector = deltaVector.normalize();
        const p1: Projection = this.project(c1, circleAxis);
        const p2: Projection = this.projectCircle(c2, circleAxis);

        if (!p1.overlap(p2)) {
            return false;
        }

        // Check polygon axis
        const polygonAxes = c1.getNormals();
        for (let i = 0; i < polygonAxes.length; i++) {
            const axis = polygonAxes[i].normalize();

            const p1: Projection = this.project(c1, axis);
            const p2: Projection = this.projectCircle(c2, axis);

            if (!p1.overlap(p2)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Projects a circle onto an axis and returns the projection.
     * @param circle The circle collider to project.
     * @param axis The axis to project onto.
     * @returns The projection of the circle onto the axis.
     */
    private projectCircle(circle: CircleCollider, axis: Vector): Projection {
        // Project the center

        const centerProj = Vector.dot(axis, circle.parentTransform.position);

        return new Projection(centerProj - circle.radius, centerProj + circle.radius);
    }
}
