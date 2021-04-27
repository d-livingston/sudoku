import Network from "./network";
import Node from "./node";

export default class NetworkSolver {
    public network: Network;

    constructor(network?: Network) {
        if (network) this.setNetwork(network);
    }

    /**
     * Covers a column such that all nodes in the column
     * and all rows those nodes are in are removed from the network.
     * @param c A column node in the network.
     */
    public cover(c: Node): void {
        if (this.network.find((n: Node) => c === n, { isColumn: true })) {
            this._cover(c);
        }
    }

    /**
     * Uncovers a column such that the cover is reversed.
     * @param c A column node that has been covered from the network.
     */
    public uncover(c: Node): void {
        if (
            c.isColumn &&
            !this.network.find((n: Node) => c === n, { isColumn: true })
        ) {
            this._uncover(c);
        }
    }

    /**
     * Removes a node in the network such that all nodes in the row have their columns covered.
     * @param n A node in the network.
     */
    public remove(n: Node): void {
        if (
            this.network.find((node: Node) => n === node, { isColumn: false })
        ) {
            this._remove(n);
        }
    }

    /**
     * Unremoves a node such that the remove is reversed.
     * @param n A node that has been removed from the network.
     */
    public unremove(n: Node): void {
        if (
            !n.isColumn &&
            !this.network.find((node: Node) => n === node, { isColumn: false })
        ) {
            this._unremove(n);
        }
    }

    /**
     * Hides a node in the network such that all nodes in the row are removed from the network.
     * @param n A node in the network.
     */
    public hide(n: Node): void {
        if (
            this.network.find((node: Node) => n === node, { isColumn: false })
        ) {
            this._hide(n);
        }
    }

    /**
     * Unhides a node such that the original hide is reversed.
     * @param n A node that has been hidden from the network.
     */
    public unhide(n: Node): void {
        if (
            !n.isColumn &&
            !this.network.find((node: Node) => n === node, { isColumn: false })
        ) {
            this._unhide(n);
        }
    }

    /**
     * Sets the network to be solved by the network solver.
     * @param network A network.
     */
    public setNetwork(network: Network): void {
        this.network = network;
    }

    private _cover(c: Node): void {
        c.right.left = c.left;
        c.left.right = c.right;
        c.forEach("down", (i: Node) => {
            i.forEach("right", (j: Node) => {
                j.down.up = j.up;
                j.up.down = j.down;
                j.column.size--;
            });
        });
    }

    private _uncover(c: Node): void {
        c.forEach("up", (i: Node) => {
            i.forEach("left", (j: Node) => {
                j.column.size++;
                j.down.up = j;
                j.up.down = j;
            });
        });
        c.right.left = c;
        c.left.right = c;
    }

    private _remove(n: Node): void {
        n.forEach("right", (i: Node) => {
            this._cover(i.column);
        });
        this._cover(n.column);
    }

    private _unremove(n: Node): void {
        this._uncover(n.column);
        n.forEach("left", (i: Node) => {
            this._uncover(i.column);
        });
    }

    private _hide(n: Node): void {
        this._hideNode(n);
        n.forEach("right", (i: Node) => {
            this._hideNode(i);
        });
    }

    private _unhide(n: Node): void {
        this._unhideNode(n);
        n.forEach("right", (i: Node) => {
            this._unhideNode(i);
        });
    }

    private _hideNode(n: Node): void {
        n.column.size--;
        n.up.down = n.down;
        n.down.up = n.up;
    }

    private _unhideNode(n: Node): void {
        n.column.size++;
        n.up.down = n;
        n.down.up = n;
    }
}
