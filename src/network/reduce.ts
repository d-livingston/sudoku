import { Network } from "./network";
import Node from "../node";
import { IterateOptions } from "./types";

type Callback<T> = (acc: T | undefined, current: Node) => T | undefined;

declare module "./network" {
    interface Network {
        /**
         * Reduces the network to a single value.
         * @param callback The reducer function.
         * @param options Options for restricting or changing the iteration.
         */
        reduce<T>(
            callback: Callback<T>,
            options?: IterateOptions
        ): T | undefined;
    }
}

Network.prototype.reduce = function <T>(
    callback: Callback<T>,
    { minColumn = 0, maxColumn, isColumn = true }: IterateOptions = {}
) {
    const max = maxColumn ? maxColumn : this.columnLength;
    let c = this.root;
    let result = undefined;
    do {
        c = c.right;
        if (c.columnId < minColumn) continue;
        if (c.columnId >= max) break;
        if (isColumn) {
            result = callback(result, c);
        } else {
            result = c.reduce("down", callback, result);
        }
    } while (c !== this.root);
    return result;
};
