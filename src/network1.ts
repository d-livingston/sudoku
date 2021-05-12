import Node from "./node1";

export default class Network {
    public readonly root: Node;

    static from(matrix: number[][]): Network {
        return new Network(
            matrix.length,
            matrix[0].length,
            (row: number, column: number) => matrix[row][column] !== 0
        );
    }

    constructor(
        public readonly rows: number,
        public readonly columns: number,
        isNode: (row: number, column: number) => boolean
    ) {
        this.root = new Node();
        this.build(isNode);
    }

    reduce<T>(
        callback: (previousValue: T | undefined, currentNode: Node) => T,
        initialValue?: T,
        { isColumn = true, minColumn = 0, maxColumn = this.columns } = {}
    ): T | undefined {
        let result = initialValue;
        let c = this.root;
        do {
            c = c.right;
            if (c.columnId < minColumn) continue;
            if (c.columnId >= maxColumn) break;
            if (isColumn) {
                result = callback(result, c);
            } else {
                result = c.reduce("down", callback, result);
            }
        } while (c !== this.root);
        return result;
    }

    find(
        predicate: (n: Node) => boolean,
        { isColumn = true, minColumn = 0, maxColumn = this.columns } = {}
    ): Node | undefined {
        let c = this.root;
        do {
            c = c.right;
            if (c.columnId < minColumn) continue;
            if (c.columnId >= maxColumn) return undefined;
            if (isColumn) {
                if (predicate(c)) return c;
            } else {
                const n = c.find("down", predicate);
                if (n) return n;
            }
        } while (c !== this.root);
        return undefined;
    }

    filter(
        predicate: (n: Node) => boolean,
        { isColumn = true, minColumn = 0, maxColumn = this.columns } = {}
    ) {
        let nodes: Node[] = [];
        let c = this.root;
        do {
            c = c.right;
            if (c.columnId < minColumn) continue;
            if (c.columnId >= maxColumn) break;
            if (isColumn) {
                if (predicate(c)) nodes.push(c);
            } else {
                const nodesInColumn = c.filter("down", predicate);
                nodes = nodes.concat(nodesInColumn);
            }
        } while (c !== this.root);
        return nodes;
    }

    toMatrix(): number[][] {
        const matrix: number[][] = Array.from({ length: this.rows }, () =>
            Array.from({ length: this.columns }, () => 0)
        );
        this.root.forEach("right", (c: Node) => {
            c.forEach("down", (n: Node) => {
                matrix[n.rowId][n.columnId] = 1;
            });
        });
        return matrix;
    }

    isFullyConnected(): boolean {
        let lastC = this.root;
        let c = this.root.right;
        while (c !== this.root) {
            // Check that columns are connected to each other left to right
            if (!c) return false;
            if (c.left !== lastC) return false;
            let size = 0;
            let n = c.down;
            let lastN = c;
            while (n !== c) {
                // Check that nodes in columns are connected to each other top to bottom
                if (!n) return false;
                if (n.up !== lastN) return false;
                if (n.columnId !== c.columnId) return false;
                if (n.column !== c) return false;
                size++;

                let r = n.right;
                let lastR = n;
                while (r !== n) {
                    // Check that nodes in rows are connected to each other left to right
                    if (!r) return false;
                    if (r.left !== lastR) return false;
                    if (r.rowId !== n.rowId) return false;

                    lastR = r;
                    r = r.right;
                }
                lastN = n;
                n = n.down;
            }
            // Check that column size is accurate
            if (size !== c.size) return false;
            lastC = c;
            c = c.right;
        }
        return true;
    }

    /**
     * Gets the number of active columns in the network.
     * @returns The number of active columns in the network.
     */
    getNumberOfActiveColumns(): number {
        return this.filter((_: Node) => true).length;
    }

    /**
     * Gets the number of active nodes in the network.
     * @returns The number of active nodes in the network.
     */
    getNumberOfActiveNodes(): number {
        return this.filter((_: Node) => true, { isColumn: false }).length;
    }

    public isEmpty(): boolean {
        return this.root.right === this.root;
    }

    private build(isNode: (row: number, column: number) => boolean) {
        this.buildColumns();
        this.buildRows(isNode);
    }

    private buildColumns() {
        let c = this.root;
        for (let columnIndex = 0; columnIndex < this.columns; columnIndex++) {
            c.right = new Node(columnIndex);
            c.right.left = c;
            c = c.right;
        }
        c.right = this.root;
        this.root.left = c;
    }

    private buildRows(isNode: (row: number, column: number) => boolean) {
        for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
            let first = this.root,
                last = this.root,
                c = this.root;

            for (
                let columnIndex = 0;
                columnIndex < this.columns;
                columnIndex++
            ) {
                c = c.right!;
                if (!isNode(rowIndex, columnIndex)) continue;

                c.size++;

                let n = c;
                while (n.down) n = n.down;

                const next = new Node(columnIndex, rowIndex);
                next.up = n;
                next.column = c;

                if (last === this.root) {
                    first = next;
                } else {
                    next.left = last;
                    last.right = next;
                }

                n.down = next;
                c.up = next;
                last = next;
            }

            first.left = last;
            last.right = first;
        }

        let c = this.root.right;
        while (c !== this.root) {
            c.up.down = c;
            c = c.right;
        }
    }
}
