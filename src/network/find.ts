import { Network } from "./network";
import Node from "../node";
import { IterateOptions } from "./types";

type Predicate = (n: Node) => boolean;

declare module "./network" {
    interface Network {
        /**
         * Finds a node in the network matching the given predicate.
         * @param predicate The predicate to match.
         * @param options Options for restricting or changing the iteration.
         */
        find(predicate: Predicate, options?: IterateOptions): Node | undefined;
    }
}

Network.prototype.find = function (
    predicate: Predicate,
    { minColumn = 0, maxColumn, isColumn = true }: IterateOptions = {}
) {
    const max = maxColumn ? maxColumn : this.columnLength;
    let c = this.root;
    do {
        c = c.right;
        if (c.columnId < minColumn) continue;
        if (c.columnId >= max) return undefined;
        if (isColumn) {
            if (predicate(c)) return c;
        } else {
            const n = c.find("down", predicate);
            if (n) return n;
        }
    } while (c !== this.root);
    return undefined;
};
