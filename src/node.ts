import {
    Direction,
    NodeInterface,
    NodePredicateFunction,
    NodeMapFunction,
    NodeReduceCallback,
} from "./types";

export default class Node implements NodeInterface {
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

    map<T>(direction: Direction, callback: NodeMapFunction<T>) {
        const results: T[] = [];
        let n = this[direction];
        while (n && n !== this) {
            results.push(callback(n));
            n = n[direction];
        }
        return results;
    }

    reduce(direction: Direction, callback: NodeReduceCallback) {
        let result: Node = this;
        let n = this[direction];
        while (n && n !== this) {
            result = <Node>callback(result, n);
            n = n[direction];
        }
        return result;
    }
}
