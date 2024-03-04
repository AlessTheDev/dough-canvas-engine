export function lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
}
