import { Node } from "./node";
import { Direction } from "../directions";

type Callback<T> = (acc: T | undefined, current: Node) => T | undefined;

declare module "./node" {
    interface Node {
        reduce<T>(
            direction: Direction,
            callback: Callback<T>,
            initial?: T
        ): T | undefined;
    }
}

Node.prototype.reduce = function <T>(
    direction: Direction,
    callback: Callback<T>,
    initial?: T
): T | undefined {
    let acc = initial;
    let n = this[direction];
    while (n !== this) {
        acc = callback(acc, n);
        n = n[direction];
    }
    return acc;
};
