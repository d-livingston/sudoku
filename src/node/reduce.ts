import { Node } from "./node";
import { Direction } from "../directions";

type Callback<T> = (acc: T | undefined, current: Node) => T | undefined;

declare module "./node" {
    interface Node {
        /**
         * Reduces the nodes in the given direction to a single value.
         * @param direction The desired direction to iterate through.
         * @param callback The callback function to call each node with.
         * @param initial The initial value for the accumulator.
         */
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
