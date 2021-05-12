import { Node } from "./node";
import { Direction, getOppositeDirection } from "../directions";

declare module "./node" {
    interface Node {
        /**
         * Connects a node to another such that the entire length of nodes is connected.
         * @param direction The desired direction of the node to be connected.
         * @param node The node to connect.
         */
        connect(direction: Direction, node: Node): void;
    }
}

Node.prototype.connect = function (direction: Direction, node: Node) {
    const oppositeDirection = getOppositeDirection(direction);
    const existingNode = this[direction];
    const existingOther = node[oppositeDirection];

    // Change links on this node
    this[direction] = node;
    existingNode[oppositeDirection] = existingOther;

    // Change links on the other node
    node[oppositeDirection] = this;
    existingOther[direction] = existingNode;
};
