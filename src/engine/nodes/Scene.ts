import EngineNode from "./EngineNode";
import SceneNode from "./SceneNode";
import TopLayerNodeContainer from "./containers/TopLayerNodeContainer";
import Vector from "../Vector";
import SceneManager from "./SceneManager";
import SceneExtensionContainer from "./containers/SceneExtensionsContainer";
import SceneExtension from "./SceneExtension";
import CollidersManager from "./extensions/CollidersManager";

/**
 * Represents a scene in a game or application, extending the EngineNode class.
 * Manages a hierarchy of scene nodes and provides functionality for updating and rendering.
 */
export default class Scene extends EngineNode {
    /**
     * Container for top layer nodes that won't be sorted and will be updated after all other subnodes.
     * Useful for elements like particles.
     */
    private topLayerNodes: TopLayerNodeContainer;
    private extensions: SceneExtensionContainer;

    private canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    private initFn: Function;
    private animationFrameId: number | null;
    private flex: boolean;

    private dimensions: Vector;

    /**
     * Creates an instance of Scene.
     * @param dimensions - The dimensions of the scene. Use `enableFlex` to make it resize based on a parent element
     * @param initFunction - The initialization function called when the scene is assigned.
     */
    constructor(dimensions: Vector, initFunction: Function) {
        super();
        this.disable();

        this.topLayerNodes = new TopLayerNodeContainer();
        this.extensions = new SceneExtensionContainer();
        this.flex = false;
        this.animationFrameId = null;

        this.canvas = document.querySelector("#dough-engine") as HTMLCanvasElement;
        this._context = this.canvas.getContext("2d")!;

        this.initFn = initFunction;
        this.dimensions = dimensions;

    }

    //#region Getters and Setters
    /**
     * Gets the rendering context of the canvas.
     */
    public get context(): CanvasRenderingContext2D {
        return this._context;
    }

    private resizeEventAction = () => this.resizeFlex();

    /**
     * Enables automatic resizing of the canvas based on the parent element when the window is resized.
     */
    public enableFlex(): void {
        window.addEventListener("resize", this.resizeEventAction);
        this.flex = true;
    }

    /**
     * Disables automatic resizing of the canvas when the window is resized.
     */
    public disableFlex(): void {
        window.removeEventListener("resize", this.resizeEventAction);
        this.flex = false;
    }

    public getSceneManager(): SceneManager {
        return this.parent as SceneManager;
    }
    //#endregion

    /**
     * Updates the canvas width based on the canvas parent element.
     */
    private resizeFlex(): void {
        if (!this.isActive) return;
        this.canvas.width = this.canvas.parentElement?.clientWidth!;
        this.canvas.height = this.canvas.parentElement?.clientHeight!;
    }

    /**
     * Initializes the scene, setting dimensions and calling the custom initialization function.
     */
    public _init(): void {
        this.enable();

        // Set width and height
        this.canvas.width = this.dimensions.x;
        this.canvas.height = this.dimensions.y;

        if (this.flex) this.resizeFlex();

        // Reset subnodes and objects
        this.removeAllSubNodes();
        this.topLayerNodes.removeAllSubNodes();
        
        this.addBaseExtensions();
        this.extensions._init();
        this.initFn();
        this._update();
    }

    /**
     * Updates the scene, updating nodes, and rendering top layer nodes.
     */
    public _update(): void {
        if (!this.isActive) return;

        // Update extensions
        this.extensions._update();

        // Update Nodes
        this.updateSubNodes();

        // Update topLayerNodes
        this.topLayerNodes._update();

        this.render();

        this.animationFrameId = requestAnimationFrame(this._update.bind(this));
    }

    /**
     * Clears the canvas and calls onSceneRender on all the subnodes
     */
    public render(): void {
        if (!this.isActive) return;
        // Clear the scene
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Calls onSceneRender on all subnodes
        const subNodes = this.getSubNodes();
        for (let i = 0; i < subNodes.length; i++) {
            subNodes[i].onSceneRender();
        }

        // Calls onSceneRender on all topLayerNodes
        const topLayerNodes = this.topLayerNodes.getSubNodes();
        for (let i = 0; i < topLayerNodes.length; i++) {
            topLayerNodes[i].onSceneRender();
        }
    }

    /**
     * Drops the scene, removing all nodes and stopping the animation loop.
     */
    public drop(): void {
        // Reset subnodes and objects
        this.removeAllSubNodes();
        this.topLayerNodes.removeAllSubNodes();

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        this.disable();
    }

    /**
     * Pauses the scene by stopping the update loop.
     */
    public pause(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        this.disable();
    }

    /**
     * Resumes a scene without calling the init function
     */
    public resume(): void {
        this._update();
        this.enable();
    }

    /**
     * Returns the canvas width.
     * @returns The canvas width.
     */
    public getCanvasWidth(): number {
        return this.canvas.width;
    }

    /**
     * Returns the canvas height.
     * @returns The canvas height.
     */
    getCanvasHeight(): number {
        return this.canvas.height;
    }

    /**
     * Adds a scene node to the scene.
     * @param n - The scene node to add.
     */
    public add(n: SceneNode): void {
        this.addSubNode(n);
    }

    /**
     * Removes a scene node from the scene.
     * @param n - The scene node to remove.
     */
    public remove(n: SceneNode): void {
        this.removeSubNode(n);
    }

    /**
     * Adds a top layer scene node to the scene.
     * @param n - The top layer scene node to add.
     */
    public addTopLayerNode(n: SceneNode): void {
        this.topLayerNodes.addSubNode(n);
    }

    /**
     * Removes a top layer scene node from the scene.
     * @param n - The top layer scene node to remove.
     */
    public removeTopLayerNode(n: SceneNode): void {
        this.topLayerNodes.removeSubNode(n);
    }

    public getExtension<T extends SceneExtension>(type: { new (): T }): T | null {
        const extensions = this.extensions.getSubNodes();
    
        for (let i = 0; i < extensions.length; i++) {
            if (extensions[i] instanceof type) {
                return extensions[i] as T;
            }
        }
        return null;
    }

    /**
     * Adds an extension to the scene
     * @param e the extension to add
     */
    public useExtension(e: SceneExtension){
        this.extensions.addSubNode(e);
    }

    private addBaseExtensions(){
        this.useExtension(new CollidersManager());
    }
}
