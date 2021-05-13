import { Network } from "./network";
import Node from "../node";
import { IterateOptions } from "./types";

type Predicate = (n: Node) => boolean;

declare module "./network" {
    interface Network {
        /**
         * Filters all node in the network matching the given predicate.
         * @param predicate The predicate to match.
         * @param options Options for restricting or changing the iteration.
         */
        filter(predicate: Predicate, options?: IterateOptions): Node[];
    }
}

Network.prototype.filter = function (
    predicate: Predicate,
    { minColumn = 0, maxColumn, isColumn = true }: IterateOptions = {}
): Node[] {
    const max = maxColumn ? maxColumn : this.columnLength;
    let nodes: Node[] = [];
    let c = this.root;
    do {
        c = c.right;
        if (c.columnId < minColumn) continue;
        if (c.columnId >= max) break;
        if (isColumn) {
            if (predicate(c)) nodes.push(c);
        } else {
            const nodesInColumn = c.filter("down", predicate);
            nodes = nodes.concat(nodesInColumn);
        }
    } while (c !== this.root);
    return nodes;
};
