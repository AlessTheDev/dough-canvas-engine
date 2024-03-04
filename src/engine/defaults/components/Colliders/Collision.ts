import Collider from "./Collider";

/**
 * Represents a collision between two Collider instances.
 */
export default class Collision {
    private c1: Collider;
    private c2: Collider;

    /**
     * Creates a new Collision instance.
     * @param c1 The first Collider involved in the collision.
     * @param c2 The second Collider involved in the collision.
     */
    constructor(c1: Collider, c2: Collider) {
        this.c1 = c1;
        this.c2 = c2;
    }

    /**
     * Notifies both colliders that a collision has occurred.
     */
    public notifyOnCollisionEnter() {
        if (this.c1.parent === this.c2.parent) return;

        this.c1.onCollisionEnter(this.c2);
        this.c2.onCollisionEnter(this.c1);
    }

    /**
     * Notifies both colliders that a collision is ongoing.
     */
    public notifyOnCollisionStay() {
        if (this.c1.parent === this.c2.parent) return;

        this.c1.onCollisionStay(this.c2);
        this.c2.onCollisionStay(this.c1);
    }

    /**
     * Notifies both colliders that a collision has ended.
     */
    public notifyOnCollisionExit() {
        if (this.c1.parent === this.c2.parent) return;

        this.c1.onCollisionExit(this.c2);
        this.c2.onCollisionExit(this.c1);
    }

    /**
     * Determines if the colliders could be colliding based on their bounds.
     * @returns A boolean indicating whether the colliders could be colliding.
     */
    public couldBeColliding(): boolean {
        const c1Bounds = this.c1.getBounds();
        const c2Bounds = this.c2.getBounds();

        return (c2Bounds.left.x <= c1Bounds.right.x);
    }

    /**
     * Checks if this Collision instance is equal to another Collision instance.
     * @param other The other Collision instance to compare.
     * @returns A boolean indicating whether the two Collision instances are equal.
     */
    public equals(other: Collision): boolean {
        return (this.c1 === other.c1 && this.c2 === other.c2) ||
            (this.c1 === other.c2 && this.c2 === other.c1);
    }
}