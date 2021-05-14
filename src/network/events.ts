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
    }
}

Network.prototype.dispatch = async function (
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

            await cover(node);
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

            await remove(node);
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

            await hide(node);
            this.networkHistory.push({ type, node });
            break;
        }
        case NetworkEventType.Undo: {
            if (this.networkHistory.length === 0) return;

            const { type, node } = this.networkHistory.pop()!;
            return await undo(type, node);
        }
        case NetworkEventType.Reset: {
            while (this.networkHistory.length !== 0) {
                await this.dispatch(NetworkEventType.Undo);
            }
            break;
        }
        default: {
            throw new TypeError("Invalid network event type.");
        }
    }
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

            coverSync(node);
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

            removeSync(node);
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

            hideSync(node);
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

async function undo(type: NetworkEventType, node: Node): Promise<void> {
    switch (type) {
        case NetworkEventType.Cover: {
            await undoCover(node);
            break;
        }
        case NetworkEventType.Remove: {
            await undoRemove(node);
            break;
        }
        case NetworkEventType.Hide: {
            await undoHide(node);
            break;
        }
        default: {
            throw new Error("Event history is corrupted. Invalid event type.");
        }
    }
}

function undoSync(type: NetworkEventType, node: Node): void {
    switch (type) {
        case NetworkEventType.Cover: {
            undoCoverSync(node);
            break;
        }
        case NetworkEventType.Remove: {
            undoRemoveSync(node);
            break;
        }
        case NetworkEventType.Hide: {
            undoHideSync(node);
            break;
        }
        default: {
            throw new Error("Event history is corrupted. Invalid event type.");
        }
    }
}

async function cover(n: Node): Promise<void> {
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

function coverSync(n: Node): void {
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

async function undoCover(n: Node): Promise<void> {
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

function undoCoverSync(n: Node): void {
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

async function remove(n: Node): Promise<void> {
    n.forEach("right", (i: Node) => {
        coverSync(i.column);
    });
    coverSync(n.column);
}

function removeSync(n: Node): void {
    n.forEach("right", (i: Node) => {
        coverSync(i.column);
    });
    coverSync(n.column);
}

async function undoRemove(n: Node): Promise<void> {
    undoCoverSync(n.column);
    n.forEach("left", (i: Node) => {
        undoCoverSync(i.column);
    });
}

function undoRemoveSync(n: Node): void {
    undoCoverSync(n.column);
    n.forEach("left", (i: Node) => {
        undoCoverSync(i.column);
    });
}

async function hide(n: Node): Promise<void> {
    hideNode(n);
    n.forEach("right", (i: Node) => {
        hideNode(i);
    });
}

function hideSync(n: Node): void {
    hideNode(n);
    n.forEach("right", (i: Node) => {
        hideNode(i);
    });
}

async function undoHide(n: Node): Promise<void> {
    undoHideNode(n);
    n.forEach("right", (i: Node) => {
        undoHideNode(i);
    });
}

function undoHideSync(n: Node): void {
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
