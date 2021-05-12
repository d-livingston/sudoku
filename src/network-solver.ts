import Network from "./network1";
import Node from "./node1";

export enum RemoveTypes {
    HIDE = "hide",
    COVER = "cover",
    REMOVE = "remove",
}

export default class NetworkSolver {
    public network: Network;
    public currentSolution: Node[] = [];
    private history: { type: RemoveTypes; node: Node }[];
    private solutions: Node[][] = [];

    constructor(network?: Network) {
        if (network) this.setNetwork(network);
    }

    /**
     * Determines if the network has multiple solutions.
     * @returns True if the network has multiple solutions; false otherwise.
     */
    public hasMultipleSolutions(): boolean {
        let hasMultipleSolutions = false,
            stopSolving = false,
            solutionFound = false;

        this.search({
            onSolutionFound: () => {
                if (solutionFound) {
                    stopSolving = true;
                    hasMultipleSolutions = true;
                } else {
                    solutionFound = true;
                }
            },
            stopSolving: () => stopSolving,
        });

        this.solutions = [];
        return hasMultipleSolutions;
    }

    /**
     * Solves the network for as many solutions as it has.
     * @param options Options for solving the network.
     * @returns A list of solutions for the network.
     */
    public solve({ findOne = false }: { findOne?: boolean } = {}): Node[][] {
        let onSolutionFound = undefined;
        let stopSolving = undefined;

        if (findOne) {
            let shouldStopSolving = false;
            onSolutionFound = () => {
                shouldStopSolving = true;
            };
            stopSolving = () => shouldStopSolving;
        }

        this.search({ onSolutionFound, stopSolving });
        const solutions = [...this.solutions];

        this.solutions = [];
        return solutions;
    }

    /**
     * Adds a node to the solution of the network.
     * @param n A row node.
     */
    public addToSolution(n: Node): void {
        if (
            this.network.find((node: Node) => n === node, { isColumn: false })
        ) {
            this.addNodeToSolution(n);
            this.remove(n);
        }
    }

    /**
     * Removes the last node from the solution of the network.
     */
    public removeLastFromSolution(): void {
        this.removeLastNodeFromSolution();
        this.undo();
    }

    /**
     * Resets the current network to its starting state.
     */
    public reset(): void {
        while (this.history.length !== 0) {
            this.undo();
        }
        this.solutions = [];
        this.currentSolution = [];
    }

    /**
     * Undo-s the last node that is removed.
     */
    public undo(): void {
        const event = this.history.pop();
        switch (event?.type) {
            case RemoveTypes.HIDE: {
                this.unhide(event.node);
                break;
            }
            case RemoveTypes.COVER: {
                this.uncover(event.node);
                break;
            }
            case RemoveTypes.REMOVE: {
                this.unremove(event.node);
                break;
            }
        }
    }

    /**
     * Covers a column such that all nodes in the column
     * and all rows those nodes are in are removed from the network.
     * @param c A column node in the network.
     */
    public cover(c: Node): void {
        if (this.network.find((n: Node) => c === n, { isColumn: true })) {
            this._cover(c);
            this.addEventToHistory(RemoveTypes.COVER, c);
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
            this.addEventToHistory(RemoveTypes.REMOVE, n);
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
            this.addEventToHistory(RemoveTypes.HIDE, n);
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
        this.history = [];
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

    private addEventToHistory(type: RemoveTypes, node: Node) {
        this.history.push({ type, node });
    }

    private search({
        onSolutionFound,
        stopSolving,
    }: {
        onSolutionFound?: () => void;
        stopSolving?: () => boolean;
    } = {}) {
        if (stopSolving && stopSolving()) return;

        if (this.network.isEmpty()) {
            onSolutionFound && onSolutionFound();
            this.addSolution();
        } else {
            const c: Node = this.network.reduce(
                (smallestC: Node, currentC: Node) => {
                    if (!smallestC) return currentC;
                    return currentC.size < smallestC.size
                        ? currentC
                        : smallestC;
                }
            )!;
            this.cover(c);
            c.forEach("down", (r: Node) => {
                this.addNodeToSolution(r);
                r.forEach("right", (j: Node) => {
                    this.cover(j.column);
                });
                this.search({ onSolutionFound, stopSolving });
                r.forEach("left", (_: Node) => {
                    this.undo();
                });
                this.removeLastNodeFromSolution();
            });
            this.undo();
        }
    }

    private addSolution(): void {
        this.solutions.push([...this.currentSolution]);
    }

    private addNodeToSolution(n: Node): void {
        this.currentSolution.push(n);
    }

    private removeLastNodeFromSolution(): void {
        this.currentSolution.pop();
    }
}
