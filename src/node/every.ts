import { Node } from "./node";
import { Direction } from "../directions";

type Predicate = (node: Node) => boolean;

declare module "./node" {
    interface Node {
        /**
         * Determines if every node in the given direction matches the given predicate.
         * @param direction The desired direction to iterate through.
         * @param predicate The predicate function to match.
         */
        every(direction: Direction, predicate: Predicate): boolean;
    }
}

Node.prototype.every = function (direction: Direction, predicate: Predicate) {
    let n = this[direction];
    while (n !== this) {
        if (!predicate(n)) return false;
        n = n[direction];
    }
    return true;
};
