import Engine from "./engine/Engine";
import Vector from "./engine/Vector";
import Scene from "./engine/nodes/Scene";
import { randomInt } from "./engine/utils/utils";
import MovingCircle from "./tests/Circles/MovingCircle";
import FPSMonitoring from "./tests/FPSMonitoring";
import MovingSquare from "./tests/Squares/MovingSquare";
import MovingTriangle from "./tests/Triangles/MovingTriangle";


Engine.init();
const testScene = new Scene(new Vector(100, 100), testSceneInit);

testScene.enableFlex();
Engine.sceneManager.assignScene(testScene);



function testSceneInit() {
    //squareAndTriangle();
    highObjectsTest(200);
    testScene.addTopLayerNode(new FPSMonitoring())
}

function highObjectsTest(n: number) {
    for (let i = 0; i < n; i++) {
        const randomPos = new Vector(Math.random() * testScene.getCanvasHeight() - 10, Math.random() * testScene.getCanvasHeight() - 10);;
        switch (randomInt(0, 3)) {
            case 0:
                const square = new MovingSquare(50, 2);
                square.transform.localPosition = randomPos;
                testScene.add(square);
                break;
            case 1:
                const triangle = new MovingTriangle(50, 2);
                triangle.transform.localPosition = randomPos;
                testScene.add(triangle);
                break;
            case 2:
                const circle = new MovingCircle(40, 2);
                circle.transform.localPosition = randomPos;
                testScene.add(circle);
                break;
        }
    }
}
/*
function circleAndCircle() {
    testScene.add(new CircleCenter(100));
    testScene.add(new CircleFollowMouse(100));
}

function squareAndSquare() {
    testScene.add(new SquareCenter(100));
    testScene.add(new SquareFollowMouse(100));
}

function circleAndSquare() {
    testScene.add(new CircleCenter(50));
    testScene.add(new SquareFollowMouse(100));
}

function squareAndTriangle() {
    testScene.add(new TriangleCenter(50));
    testScene.add(new SquareFollowMouse(100));
}

*/