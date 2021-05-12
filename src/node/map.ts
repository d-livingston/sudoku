import { Node } from "./node";
import { Direction } from "../directions";

type Callback<T> = (node: Node) => T;

declare module "./node" {
    interface Node {
        /**
         * Maps the nodes in the given direction with the given callback function.
         * @param direction The desired direction to iterate through.
         * @param callback The callback to call with every node.
         */
        map<T>(direction: Direction, callback: Callback<T>): T[];
    }
}

Node.prototype.map = function <T>(
    direction: Direction,
    callback: Callback<T>
): T[] {
    const results: T[] = [];
    let n = this[direction];
    while (n !== this) {
        results.push(callback(n));
        n = n[direction];
    }
    return results;
};
