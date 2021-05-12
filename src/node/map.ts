import { Node } from "./node";
import { Direction } from "../directions";

type Callback<T> = (node: Node) => T;

declare module "./node" {
    interface Node {
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
