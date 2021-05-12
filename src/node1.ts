import { Direction } from "./types";

export type NodePredicateFunction = (node: Node) => boolean;
export type NodeMapFunction<T> = (node: Node) => T;
export type NodeReduceCallback = (
    previousValue: Node,
    currentNode: Node
) => Node;

export default class Node {
    public left: Node;
    public right: Node;
    public up: Node;
    public down: Node;
    public column: Node;

    public readonly isColumn: boolean;
    public size: number = 0;

    public constructor(
        public readonly columnId: number = -1,
        public readonly rowId: number = -1
    ) {
        this.isColumn = rowId < 0;
        if (this.isColumn) this.column = this;
    }

    find(direction: Direction, predicate: NodePredicateFunction) {
        let n = this[direction];
        while (n && n !== this) {
            if (predicate(n)) return n;
            n = n[direction];
        }
        return;
    }

    filter(direction: Direction, predicate: NodePredicateFunction) {
        const results = [];
        let n = this[direction];
        while (n && n !== this) {
            if (predicate(n)) results.push(n);
            n = n[direction];
        }
        return results;
    }

    forEach(direction: Direction, callback: (n: Node) => void) {
        let n = this[direction];
        while (n && n !== this) {
            callback(n);
            n = n[direction];
        }
        return;
    }

    map<T>(direction: Direction, callback: NodeMapFunction<T>) {
        const results: T[] = [];
        let n = this[direction];
        while (n && n !== this) {
            results.push(callback(n));
            n = n[direction];
        }
        return results;
    }

    reduce<T>(
        direction: Direction,
        callback: (previousValue: T | undefined, currentNode: Node) => T,
        initialValue?: T
    ) {
        let result = initialValue;
        let n = this[direction];
        while (n && n !== this) {
            result = callback(result, n);
            n = n[direction];
        }
        return result;
    }
}
