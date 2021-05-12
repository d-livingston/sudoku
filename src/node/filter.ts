import { Node } from "./node";
import { Direction } from "../directions";

type Predicate = (node: Node) => boolean;

declare module "./node" {
    interface Node {
        /**
         * Filters all nodes in the given direction that match a predicate.
         * @param direction The desired direction to iterate through.
         * @param predicate The predicate function to match.
         */
        filter(direction: Direction, predicate: Predicate): Node[];
    }
}

Node.prototype.filter = function (direction: Direction, predicate: Predicate) {
    const nodes: Node[] = [];
    let n = this[direction];
    while (n !== this) {
        if (predicate(n)) nodes.push(n);
        n = n[direction];
    }
    return nodes;
};
