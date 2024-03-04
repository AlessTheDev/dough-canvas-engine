
/**
 * Removes an object from an array (error free)
 * @param array the array
 * @param obj the object to remove
 */
function removeFromArray<T>(array: Array<T>, obj: T) {
    const index = array.indexOf(obj);

    if (index != -1) {
        array.splice(index, 1);
    }
}

function drawCircle(context: CanvasRenderingContext2D, x: number, y: number) {
    context.save();
    context.translate(x, y);
    context.beginPath();
    context.arc(0, 0, 5, 0, Math.PI * 2, false);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
    context.restore();
}

/**
 * Generate a random number between max and min
 * @param min - The min number (inclusive)
 * @param max - the max number (exclusive)
 * @returns A random number between min (inclusive) and max (exclusive) 
 */
function randomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}


export { removeFromArray, drawCircle, randomInt }