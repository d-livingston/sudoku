import { Node } from "./node";
import { Direction } from "../directions";

type Predicate = (node: Node) => boolean;

declare module "./node" {
    interface Node {
        /**
         * Finds a node in the given direction that matches the given predicate function.
         * @param direction The desired direction to iterate through.
         * @param predicate The predicate function to match.
         */
        find(direction: Direction, predicate: Predicate): Node | undefined;
    }
}

Node.prototype.find = function (direction: Direction, predicate: Predicate) {
    let n = this[direction];
    while (n !== this) {
        if (predicate(n)) return n;
        n = n[direction];
    }
    return;
};
