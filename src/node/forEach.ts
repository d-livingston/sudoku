import { Node } from "./node";
import { Direction } from "../directions";

type Callback = (node: Node) => void;

declare module "./node" {
    interface Node {
        /**
         * Calls a function with each node in the given direction.
         * @param direction The direction to iterate over.
         * @param callback The callback function to call.
         */
        forEach(direction: Direction, callback: Callback): void;
    }
}

Node.prototype.forEach = function (direction: Direction, callback: Callback) {
    let n = this[direction];
    while (n !== this) {
        callback(n);
        n = n[direction];
    }
};
