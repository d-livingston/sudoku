import Node, { Column, Root } from "./node";

export default class Network {
    public readonly root: Root;
    private readonly history: Array<
        { type: "cover"; node: Column } | { type: "remove"; node: Node }
    > = [];
    private currentSolution: Node[] = [];
    private solution: Node[] = [];
    private multipleSolutionsFound: boolean = false;

    constructor(
        rows: number,
        columns: number,
        isNode: (row: number, column: number) => boolean
    ) {
        // Create root
        this.root = new Root();
        this.buildColumns(columns);
        this.buildRows(rows, columns, isNode);
    }

    // Cover the column
    public cover(c: Column): void {
        c.cover();
        this.history.push({ type: "cover", node: c });
    }

    // Remove the node
    public remove(n: Node): void {
        n.removeRow();
        this.history.push({ type: "remove", node: n });
    }

    // Add the node to the solution
    public addToSolution(n: Node): void {
        this.remove(n);
        this.currentSolution.push(n);
    }

    // Undo the last operation
    public undo(): void {
        const event = this.history.pop();
        if (event) {
            switch (event.type) {
                case "cover": {
                    event.node.uncover();
                    break;
                }
                case "remove": {
                    event.node.replaceRow();
                    break;
                }
            }
        }
    }

    // Resets the network by undoing all actions taken and resetting other values
    public reset(): void {
        while (this.history.length > 0) {
            this.undo();
        }

        this.currentSolution = [];
        this.solution = [];
        this.multipleSolutionsFound = false;
    }

    // Solves the network and returns the solution
    public solve(): { solution: Node[]; unique: boolean } {
        this.search();
        const solution = [...this.solution];
        const unique = !this.multipleSolutionsFound;
        this.reset();

        return { solution, unique };
    }

    // Build and connect column headers to each other and root
    // Must do the following:
    // 1. New column connected to last column -- left
    // 2. Last column connected to new column -- right
    // 3. New column connected to itself -- down & right
    // 4. Connect very last column to root and vice versa
    private buildColumns(columns: number): void {
        // Last column starts as root
        let lastColumn: Column = this.root;
        for (let c = 0; c < columns; c++) {
            const column = new Column(c);
            column.left = lastColumn; // 1
            lastColumn.right = column; // 2
            column.down = column; // 3
            column.up = column; // 3
            lastColumn = column;
        }
        lastColumn.right = this.root; // 4
        this.root.left = lastColumn;
    }

    // Build and connect row nodes to columns and each other
    // Must do the following:
    // 1. Nodes connected to column with special property.
    // 2. Column size updated.
    // 3. Top-most node connected to column
    // 4. Middle nodes connected to each other
    // 5. Bottom-most node connected to column
    // 6. Left-most nodes connected to right-most nodes
    private buildRows(
        rows: number,
        columns: number,
        isNode: (row: number, column: number) => boolean
    ): void {
        // Build rows
        for (let r = 0; r < rows; r++) {
            let firstInRow: Node = this.root,
                lastInRow: Node = this.root,
                column: Column = this.root;

            for (let c = 0; c < columns; c++) {
                column = column.right;

                if (isNode(r, c)) {
                    const node = new Node(r, c);
                    node.column = column; // 1

                    column.size++; // 2

                    // Find the furthest node down in the column
                    let lastInColumn: Node = column;
                    while (lastInColumn.down !== column) {
                        lastInColumn = lastInColumn.down;
                    }

                    // Connect in column
                    node.up = lastInColumn; // 3 & 4
                    lastInColumn.down = node; // 4
                    node.down = column; // 5
                    column.up = node;

                    if (lastInRow.isRoot()) {
                        // Last has not yet been changed to a new node, so set first
                        firstInRow = node;
                    } else {
                        // Connect to the last node in the row
                        node.left = lastInRow; // 4
                        lastInRow.right = node; // 4
                    }

                    lastInRow = node;
                }
            }

            // Connect the first and last nodes in row
            firstInRow.left = lastInRow; // 6
            lastInRow.right = firstInRow;
        }
    }

    private search(): void {
        if (this.multipleSolutionsFound) return;
        if (this.root.right.isRoot()) {
            this.onSolutionFound();
            return;
        }

        const column = this.getSmallestColumn();
        this.cover(column);
        let r: Node | Column = column.down;
        while (!r.isColumn()) {
            this.currentSolution.push(r);
            let j: Node = r.right;

            while (j !== r) {
                this.cover(j.column);
                j = j.right;
            }

            this.search();

            j = r.left;
            while (j !== r) {
                this.undo();
                j = j.left;
            }
            this.currentSolution.pop();

            r = r.down;
        }
        this.undo();
    }

    // Copies the current solution to the solution array
    private onSolutionFound(): void {
        // No solution found yet, so save current solution
        if (this.solution.length === 0) {
            this.solution = [...this.currentSolution];
        } else {
            // Note that multiple solutions have been found
            this.multipleSolutionsFound = true;
        }
    }

    // Gets the column with the fewest nodes
    private getSmallestColumn(): Column {
        let column: Column = this.root.right;
        let smallest: Column = column;

        while (!column.isRoot()) {
            if (column.size < smallest.size) {
                smallest = column;
            }
            column = column.right;
        }

        return smallest;
    }
}
