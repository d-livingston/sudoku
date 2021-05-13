import Node from "../node";

export type IterateOptions = {
    isColumn?: boolean;
    minColumn?: number;
    maxColumn?: number;
};

export enum NetworkEventType {
    Cover = "cover",
    Remove = "remove",
    Hide = "hide",
    Undo = "undo",
    Reset = "reset",
}

export type NetworkEvent = {
    type: NetworkEventType;
    node: Node;
};
