import SceneNode from "../engine/nodes/SceneNode";

export default class FPSMonitoring extends SceneNode {
    private lastFrameTime: number;
    private frameCount: number;
    private fpsDisplayElement: HTMLElement | null;

    constructor() {
        super();
        this.lastFrameTime = Date.now();
        this.frameCount = 0;
        this.fpsDisplayElement = document.getElementById("fps-display");
    }

    public init(): void {
    }

    public update(): void {
    }

    public onSceneRender(): void {
        this.frameCount++;

        // Calculate FPS
        const currentTime = Date.now();
        const elapsed = currentTime - this.lastFrameTime;
        if (elapsed >= 1000) {
            const fps = this.frameCount;
            if (this.fpsDisplayElement) {
                this.fpsDisplayElement.innerText = `FPS: ${fps}`;
            }
            // Reset frame count and update last frame time
            this.frameCount = 0;
            this.lastFrameTime = currentTime;
        }
    }
}
