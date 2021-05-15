import { Network } from "./network";
import Node from "../node";
import { NetworkEventType } from "./types";

declare module "./network" {
    interface Network {
        /**
         * Dispatches a network event on the given node.
         * @param type The network event type to dispatch.
         * @param node The node to act upon. Not required if dispatching the undo event.
         */
        dispatch(type: NetworkEventType, node?: Node): Promise<void>;
        /**
         * Dispatches a network event on the given node.
         * @param type The network event type to dispatch.
         * @param node The node to act upon. Not required if dispatching the undo event.
         */
        dispatchSync(type: NetworkEventType, node?: Node): void;

        addNodeToSolution(node: Node): Promise<void>;
        addNodeToSolutionSync(node: Node): void;
    }
}

Network.prototype.addNodeToSolution = async function (
    node: Node
): Promise<void> {
    await this.dispatch(NetworkEventType.Remove, node);
    this.currentSolutionState.push(node);
};

Network.prototype.addNodeToSolutionSync = function (node: Node): void {
    this.dispatchSync(NetworkEventType.Remove, node);
    this.currentSolutionState.push(node);
};

Network.prototype.dispatch = async function (
    type: NetworkEventType,
    node?: Node
) {
    return this.dispatchSync(type, node);
};

Network.prototype.dispatchSync = function (
    type: NetworkEventType,
    node?: Node
) {
    switch (type) {
        case NetworkEventType.Cover: {
            if (!node)
                throw new TypeError(`No node provided. Cannot ${type} node.`);
            if (this.root === node)
                throw new TypeError(
                    `Invalid node type. Cannot ${type} root node.`
                );
            if (!node.isColumn)
                throw new TypeError(`Invalid node type. Cannot ${type} node.`);

            cover(node);
            this.networkHistory.push({ type, node });
            break;
        }
        case NetworkEventType.Remove: {
            if (!node)
                throw new TypeError(`No node provided. Cannot ${type} node.`);
            if (this.root === node)
                throw new TypeError(
                    `Invalid node type. Cannot ${type} root node.`
                );
            if (node.isColumn)
                throw new TypeError(
                    `Invalid node type. Cannot ${type} column.`
                );

            remove(node);
            this.networkHistory.push({ type, node });
            break;
        }
        case NetworkEventType.Hide: {
            if (!node)
                throw new TypeError(`No node provided. Cannot ${type} node.`);
            if (this.root === node)
                throw new TypeError(
                    `Invalid node type. Cannot ${type} root node.`
                );
            if (node.isColumn)
                throw new TypeError(
                    `Invalid node type. Cannot ${type} column.`
                );

            hide(node);
            this.networkHistory.push({ type, node });
            break;
        }
        case NetworkEventType.Undo: {
            if (this.networkHistory.length === 0) return;

            const { type, node } = this.networkHistory.pop()!;
            return undoSync(type, node);
        }
        case NetworkEventType.Reset: {
            while (this.networkHistory.length !== 0) {
                this.dispatchSync(NetworkEventType.Undo);
            }
            break;
        }
        default: {
            throw new TypeError("Invalid network event type.");
        }
    }
};

function undoSync(type: NetworkEventType, node: Node): void {
    switch (type) {
        case NetworkEventType.Cover: {
            undoCover(node);
            break;
        }
        case NetworkEventType.Remove: {
            undoRemove(node);
            break;
        }
        case NetworkEventType.Hide: {
            undoHide(node);
            break;
        }
        default: {
            throw new Error("Event history is corrupted. Invalid event type.");
        }
    }
}

function cover(n: Node): void {
    n.right.left = n.left;
    n.left.right = n.right;
    n.forEach("down", (i: Node) => {
        i.forEach("right", (j: Node) => {
            j.down.up = j.up;
            j.up.down = j.down;
            j.column.size--;
        });
    });
}

function undoCover(n: Node): void {
    n.forEach("up", (i: Node) => {
        i.forEach("left", (j: Node) => {
            j.column.size++;
            j.down.up = j;
            j.up.down = j;
        });
    });
    n.right.left = n;
    n.left.right = n;
}

function remove(n: Node): void {
    n.forEach("right", (i: Node) => {
        cover(i.column);
    });
    cover(n.column);
}

function undoRemove(n: Node): void {
    undoCover(n.column);
    n.forEach("left", (i: Node) => {
        undoCover(i.column);
    });
}

function hide(n: Node): void {
    hideNode(n);
    n.forEach("right", (i: Node) => {
        hideNode(i);
    });
}

function undoHide(n: Node): void {
    undoHideNode(n);
    n.forEach("right", (i: Node) => {
        undoHideNode(i);
    });
}

function hideNode(n: Node): void {
    n.column.size--;
    n.up.down = n.down;
    n.down.up = n.up;
}

function undoHideNode(n: Node): void {
    n.column.size++;
    n.up.down = n;
    n.down.up = n;
}
