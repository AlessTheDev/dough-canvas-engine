import { lerp } from "./utils/mathUtils";

/**
 * Vector Class
 * 
 * The `Vector` class represents a 2D vector and provides methods for vector operations.
 */
export default class Vector {
    //#region General vectors
    /**
     * The zero vector (0, 0).
     */
    public static get zero(): Vector {
        return new Vector();
    }

    /**
     * The vector with components (1, 1).
     */
    public static get one(): Vector {
        return new Vector(1, 1);
    }

    /**
     * The unit vector pointing upward (0, 1).
     */
    public static get up(): Vector {
        return new Vector(0, 1);
    }

    /**
     * The unit vector pointing downward (0, -1).
     */
    public static get down(): Vector {
        return new Vector(0, -1);
    }

    /**
     * The unit vector pointing leftward (-1, 0).
     */
    public static get left(): Vector {
        return new Vector(-1, 0);
    }

    /**
     * The unit vector pointing rightward (1, 0).
     */
    public static get right(): Vector {
        return new Vector(1, 0);
    }

    public static vertical(y: number = 0) {
        return new Vector(0, y);
    }

    public static horizontal(x: number = 0) {
        return new Vector(x, 0);
    }

    //#endregion

    private _x: number = 0;
    private _y: number = 0;

    /**
     * Constructor for the Vector class.
     * @param x - The x of the vector (default is 0).
     * @param y - The y of the vector (default is 0).
     */
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    //#region Operation methods
    /**
     * Adds two vectors.
     * @param v1 - The first vector.
     * @param v2 - The second vector.
     * @returns A new vector representing the sum of the input vectors.
     */
    public static add(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    /**
     * Adds another vector to this vector.
     * @param v - The vector to add.
     * @returns A new vector representing the sum.
     */
    public add(v: Vector): Vector {
        return Vector.add(this, v);
    }

    /**
     * Subtracts the second vector from the first vector.
     * @param v1 - The first vector.
     * @param v2 - The second vector.
     * @returns A new vector representing the result of the subtraction.
     */
    public static subtract(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    /**
     * Subtracts another vector from this vector.
     * @param v - The vector to subtract.
     * @returns A new vector representing the result of the subtraction.
     */
    public subtract(v: Vector): Vector {
        return Vector.subtract(this, v);
    }

    /**
     * Multiplies a vector by a scalar.
     * @param v - The vector.
     * @param scalar - The scalar value.
     * @returns A new vector representing the result of the multiplication.
     */
    public static multiply(v: Vector, scalar: number): Vector {
        return new Vector(v.x * scalar, v.y * scalar);
    }

    /**
     * Multiplies this vector by a scalar.
     * @param scalar - The scalar value.
     * @returns A new vector representing the result of the multiplication.
     */
    public multiply(scalar: number): Vector {
        return Vector.multiply(this, scalar);
    }

    /**
     * Divides a vector by a scalar.
     * @param v - The vector.
     * @param scalar - The scalar value.
     * @returns A new vector representing the result of the division.
     */
    public static divide(v: Vector, scalar: number): Vector {
        return new Vector(v.x / scalar, v.y / scalar);
    }

    /**
     * Divides this vector by a scalar.
     * @param scalar - The scalar value.
     * @returns A new vector representing the result of the division.
     */
    public divide(scalar: number): Vector {
        return Vector.divide(this, scalar);
    }


    /**
     * Divides one vector by another vector component-wise.
     * @param v1 - The numerator vector.
     * @param v2 - The denominator vector.
     * @returns A new vector representing the result of the component-wise division.
     */
    public static divideVec(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x / v2.x, v1.y / v2.y);
    }

    /**
     * Multiplies one vector by another vector component-wise.
     * @param v1 - The first vector.
     * @param v2 - The second vector.
     * @returns A new vector representing the result of the component-wise multiplication.
     */
    public static multiplyVec(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x * v2.x, v1.y * v2.y);
    }
    //#endregion

    /**
     * Linearly interpolates between two vectors.
     *
     * @param v1 - The starting vector.
     * @param v2 - The ending vector.
     * @param t - The interpolation factor. Should be a value between 0 and 1.
     * @returns A new vector representing the result of the linear interpolation.
     *
     * @example
     * // Usage:
     * const startVector = new Vector(0, 0);
     * const endVector = new Vector(10, 20);
     * const interpolatedVector = lerp(startVector, endVector, 0.5);
     * console.log(interpolatedVector); // Outputs: Vector { x: 5, y: 10 }
     */
    public static lerp(v1: Vector, v2: Vector, t: number): Vector {
        return new Vector(
            lerp(v1.x, v2.x, t),    // Interpolate x component
            lerp(v1.y, v2.y, t)     // Interpolate y component
        );
    }

    /**
     * Calculates the distance between two vectors.
     * @param v1 - The first vector.
     * @param v2 - The second vector.
     * @returns The distance between the two vectors.
     */
    public static distance(v1: Vector, v2: Vector) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2))
    }

    /**
     * Calculates the dot product between two vectors.
     * @param v1 - The first vector.
     * @param v2 - The second vector.
     * @returns The dot product between the two vectors.
     */
    public static dot(v1: Vector, v2: Vector): number {
        return v1.x * v2.x + v1.y * v2.y;
    }

    /**
     * Calculates the dot product between this vector and another vector.
     * @param v - The other vector.
     * @returns The dot product between this vector and the other vector.
     */
    public dot(v: Vector): number {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * Calculates the length (magnitude) of this vector.
     * @returns The length (magnitude) of this vector.
     */
    public len(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Normalizes this vector (converts it to a unit vector).
     * @returns A new Vector instance representing the normalized vector.
     * @throws Error if attempting to normalize a zero vector.
     */
    public normalize(): Vector {
        const length = this.len();
        if (length === 0) {
            throw new Error("Cannot normalize a zero vector.");
        }
        return new Vector(this.x / length, this.y / length);
    }

    /**
    * Rotates the vector by the given angle (in radians) around the origin.
    * @param angle - The angle (in radians) by which to rotate the vector.
    * @returns A new Vector instance representing the rotated vector.
    */
    public rotate(angle: number): Vector {
        return new Vector(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
    }

}
