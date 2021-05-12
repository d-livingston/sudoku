import Node from "../node";

export class Network {
    public readonly root: Node;

    /**
     * Creates and returns a network matching the given matrix of 1s and 0s.
     * @param matrix A matrix representing the network. 1s represent a node, 0s represent the absence of a node.
     * @returns A network matching the given matrix.
     */
    static from(matrix: number[][]): Network {
        return new Network(
            matrix.length,
            matrix[0].length,
            (row: number, column: number) => matrix[row][column] !== 0
        );
    }

    constructor(
        public readonly rowLength: number,
        public readonly columnLength: number,
        isNode: (row: number, column: number) => boolean
    ) {
        this.root = Node.createRoot();

        for (let cIndex = 0; cIndex < this.columnLength; cIndex++) {
            const newColumn = Node.createColumn(cIndex);
            newColumn.connect("right", this.root);
        }

        for (let rIndex = 0; rIndex < this.rowLength; rIndex++) {
            let first = this.root,
                last = this.root;
            this.root.forEach("right", (c) => {
                if (!isNode(rIndex, c.columnId)) return;

                c.size++;
                const newNode = Node.createNode({ column: c, rowId: rIndex });
                c.connect("up", newNode);

                if (last === this.root) {
                    first = newNode;
                } else {
                    newNode.left = last;
                    last.right = newNode;
                }

                last = newNode;
            });
            first.left = last;
            last.right = first;
        }
    }

    /**
     * Determines if the network is empty.
     * @returns True if the network has no columns in it; false otherwise.
     */
    isEmpty(): boolean {
        return this.root.right === this.root;
    }

    /**
     * Determines if the network has all nodes connected to each other as expected, and the appropriate column sizes.
     * @returns True if the network is fully connected; false otherwise.
     */
    isFullyConnected(): boolean {
        return this.root.every("right", (c) => {
            if (!c) return false;
            if (c.left.right !== c) return false;
            if (c.right.left !== c) return false;

            let size = 0;
            if (
                !c.every("down", (n) => {
                    if (!n) return false;
                    if (n.up.down !== n) return false;
                    if (n.down.up !== n) return false;
                    if (n.column !== c) return false;

                    size++;
                    if (
                        !n.every("right", (r) => {
                            if (!r) return false;
                            if (r.left.right !== r) return false;
                            if (r.right.left !== r) return false;
                            if (r.rowId !== n.rowId) return false;

                            return true;
                        })
                    ) {
                        return false;
                    }

                    return true;
                })
            ) {
                return false;
            }

            if (size !== c.size) return false;
            return true;
        });
    }

    /**
     * Calculates and returns the matrix matching the current network.
     * @returns A matrix representing the network.
     */
    toMatrix(): number[][] {
        const matrix: number[][] = Array.from({ length: this.rowLength }, () =>
            Array.from({ length: this.columnLength }, () => 0)
        );
        this.root.forEach("right", (c: Node) => {
            c.forEach("down", (n: Node) => {
                matrix[n.rowId][n.columnId] = 1;
            });
        });
        return matrix;
    }
}
