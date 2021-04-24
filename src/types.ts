export type Direction = "left" | "right" | "up" | "down";

export type NodePredicateFunction = (node: NodeInterface) => boolean;
export type NodeMapFunction<T> = (node: NodeInterface) => T;
export type NodeReduceCallback = (
    previousValue: NodeInterface,
    currentNode: NodeInterface
) => NodeInterface;

export interface NodeInterface {
    rowId: number;
    columnId: number;

    left?: NodeInterface;
    right?: NodeInterface;
    up?: NodeInterface;
    down?: NodeInterface;
    column?: NodeInterface;

    isColumn: boolean;
    size: number;

    find(
        direction: Direction,
        predicate: NodePredicateFunction
    ): NodeInterface | undefined;

    filter(
        direction: Direction,
        predicate: NodePredicateFunction
    ): NodeInterface[];

    map<T>(direction: Direction, callback: NodeMapFunction<T>): T[];

    reduce(direction: Direction, callback: NodeReduceCallback): NodeInterface;
}
