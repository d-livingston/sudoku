import { Node } from "../../node/node";

describe("createRoot", () => {
    it("creates the root node", () => {
        const root = Node.createRoot();

        // Other nodes
        expect(root.left).toBe(root);
        expect(root.right).toBe(root);
        expect(root.up).toBe(root);
        expect(root.down).toBe(root);
        expect(root.column).toBe(root);

        // Values
        expect(root.rowId).toBe(-1);
        expect(root.columnId).toBe(-1);
        expect(root.isColumn).toBe(false);
        expect(root.size).toBeUndefined();
    });
});

describe("createColumn", () => {
    it("creates a column node", () => {
        const column = Node.createColumn(5);

        // Other nodes
        expect(column.left).toBe(column);
        expect(column.right).toBe(column);
        expect(column.up).toBe(column);
        expect(column.down).toBe(column);
        expect(column.column).toBe(column);

        // Values
        expect(column.rowId).toBe(-1);
        expect(column.columnId).toBe(5);
        expect(column.isColumn).toBe(true);
        expect(column.size).toBe(0);
    });
});

describe("createNode", () => {
    it("creates a node", () => {
        const columnId = 5;
        const column = Node.createColumn(columnId);
        const node = Node.createNode({ column, rowId: 6 });

        // Other nodes
        expect(node.left).toBe(node);
        expect(node.right).toBe(node);
        expect(node.up).toBe(node);
        expect(node.down).toBe(node);
        expect(node.column).toBe(column);

        // Values
        expect(node.rowId).toBe(6);
        expect(node.columnId).toBe(5);
        expect(node.isColumn).toBe(false);
        expect(node.size).toBeUndefined();
    });
});
