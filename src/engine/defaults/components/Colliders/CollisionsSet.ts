import Collision from "./Collision";

/**
 * Represents a set of Collision instances.
 */
export default class CollisionsSet {
    private items: Collision[] = [];

    /** 
     * Creates a new CollisionsSet instance. 
     */
    constructor() { }

    /**
     * A function used to determine equality between Collision instances.
     * Override this method to define custom equality comparison logic.
     * @param item1 The first Collision instance.
     * @param item2 The second Collision instance.
     * @returns A boolean indicating whether the two Collision instances are equal.
     */
    private equalsFn(item1: Collision, item2: Collision): boolean {
        return item1.equals(item2);
    }

    /**
     * Creates a shallow copy of the CollisionsSet instance.
     * @returns A new CollisionsSet instance containing the same Collision instances.
     */
    public clone(): CollisionsSet {
        const clonedSet = new CollisionsSet();
        clonedSet.items = [...this.items]; // Perform a shallow copy of the items array
        return clonedSet;
    }

    /**
     * Adds a Collision instance to the set if it does not already exist.
     * @param item The Collision instance to add.
     */
    public add(item: Collision): void {
        if (!this.has(item)) {
            this.items.push(item);
        }
    }

    /**
     * Deletes a Collision instance from the set.
     * @param item The Collision instance to delete.
     */
    public delete(item: Collision): void {
        this.items = this.items.filter(existingItem => !this.equalsFn(existingItem, item));
    }

    /**
     * Checks if a Collision instance exists in the set.
     * @param item The Collision instance to check.
     * @returns A boolean indicating whether the Collision instance exists in the set.
     */
    public has(item: Collision): boolean {
        return this.items.some(existingItem => this.equalsFn(existingItem, item));
    }

    /**
     * Returns the number of Collision instances in the set.
     * @returns The number of Collision instances in the set.
     */
    public size(): number {
        return this.items.length;
    }

    /**
     * Removes all Collision instances from the set.
     */
    public clear(): void {
        this.items = [];
    }

    // Implementing the Iterable interface
    [Symbol.iterator](): Iterator<Collision> {
        let index = 0;
        const items = this.items;

        return {
            next(): IteratorResult<Collision> {
                if (index < items.length) {
                    return {
                        done: false,
                        value: items[index++]
                    };
                } else {
                    return {
                        done: true,
                        value: null as any
                    };
                }
            }
        };
    }
}
