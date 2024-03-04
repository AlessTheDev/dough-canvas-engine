import { removeFromArray } from "../utils/utils";

/**
 * Represents an abstract class for an engine node that can be used in a hierarchical structure.
 * Subclasses must implement the `_init` and `_update` methods.
 */
export default abstract class EngineNode {
    private _order: number;

    private _parent: EngineNode | null;
    private subNodes: EngineNode[];

    //#region isActive
    private _isActive: boolean;

    /**
     * Enables the object
     */
    public enable() {
        this._isActive = true;
    }

    /**
     * Disables the object (update or init won't be called)
     */
    public disable() {
        this._isActive = true;
    }
    //#endregion

    /**
     * Creates an instance of EngineNode.
     */
    constructor() {
        this._order = 0;
        this._parent = null;
        this.subNodes = [];

        this._isActive = true;
    }

    //#region Getters And Setters
    /**
     * Gets the parent node.
     */
    public get parent(): EngineNode | null {
        return this._parent;
    }

    /**
     * Gets the order used for sorting. The lower the order, the higher the priority.
     */
    public get order(): number {
        return this._order;
    }

    /**
     * Sets the order used for sorting. The lower the order, the higher the priority.
     * @param value - The new order.
     */
    public set order(value: number) {
        this._order = value;
        this.parent?.sortSubNodes();
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    public getSubNodes(): EngineNode[] {
        return this.subNodes;
    }
    //#endregion

    /**
     * Initializes the node. Subclasses must implement this method.
     */
    public abstract _init(): void;

    /**
     * Updates the node. Subclasses must implement this method.
     */
    public abstract _update(): void;

    /**
     * Called when a new parent is assigned to the node
     * @param _newParent - The new assigned parent
     */
    public onNewParent(_newParent: EngineNode): void { }

    /**
     * Called when the scene wants to render
     */
    public onSceneRender(): void { }

    /**
     * Calls the `_init` function on all subnodes.
     */
    public initSubNodes(): void {
        for (let i = 0; i < this.subNodes.length; i++) {
            this.subNodes[i]?._init();
        }
    }

    /**
     * Calls the `_update` function on all subnodes.
     */
    public updateSubNodes(): void {
        for (let i = 0; i < this.subNodes.length; i++) {
            this.subNodes[i]?._update();
        }
    }

    /**
     * Sorts subnodes based on their order property.
     */
    public sortSubNodes(): void {
        this.subNodes.sort((a: EngineNode, b: EngineNode) => {
            if (a._order > b._order) return 1;
            if (a._order < b._order) return -1;
            return 0;
        });
    }

    /**
     * Adds a subnode, sets its parent and initializes itself. Automatically sorts subnodes based on order.
     * @param n - The subnode to add.
     */
    public addSubNode(n: EngineNode): void {
        this.subNodes.push(n);
        n._parent = this;
        n.onNewParent(this);
        n._init();
        this.sortSubNodes();
    }

    /**
     * Removes a subnode 
     * @param n - The SubNode to remove
     */
    public removeSubNode(n: EngineNode): void {
        removeFromArray(this.subNodes, n);
        n._parent = null;
    }

    /**
     * Removes all subnodes 
     */
    public removeAllSubNodes(): void {
        for (let i = 0; i < this.subNodes.length; i++) {
            this.subNodes[i]!._parent = null;
        }

        this.subNodes = [];
    }
}
