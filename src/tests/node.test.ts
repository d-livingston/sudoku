import Node from "../node";

// TODO: Finish testing map and reduce

describe("constructor", () => {
    it("correctly creates a node when default parameters are used", () => {
        const node = new Node();
        expect(node).toEqual(
            expect.objectContaining({
                columnId: -1,
                rowId: -1,
                isColumn: true,
            })
        );
    });

    it("correctly creates a node when only the columnId is provided", () => {
        const node = new Node(6);
        expect(node).toEqual(
            expect.objectContaining({
                columnId: 6,
                rowId: -1,
                isColumn: true,
            })
        );
    });

    it("correctly creates a node when both are provided", () => {
        const node = new Node(6, 8);
        expect(node).toEqual(
            expect.objectContaining({
                columnId: 6,
                rowId: 8,
                isColumn: false,
            })
        );
    });
});

const column = new Node(5);
column.down = new Node(5, 1);
column.down.down = new Node(5, 4);
column.down.down.down = new Node(5, 8);
column.down.down.down.down = column;

describe("find", () => {
    it("correctly finds a node in the given direction when there is one that matches", () => {
        expect(column.find("down", (n) => n.rowId === 4)).toEqual(
            column.down.down
        );
    });

    it("returns undefined when no node exists in the given direction", () => {
        expect(column.find("down", (n) => n.rowId === 7)).toBeUndefined();
    });

    it("returns undefined when there are no nodes in the given direction", () => {
        expect(column.find("right", (n) => n.columnId === 8)).toBeUndefined();
    });
});

describe("filter", () => {
    it("correctly filters nodes when there are nodes in the given direction", () => {
        expect(column.filter("down", (n) => n.rowId < 8)).toEqual([
            column.down,
            column.down.down,
        ]);
    });

    it("correctly filters nodes when there are no nodes that match the predicate", () => {
        expect(column.filter("down", (n) => n.rowId > 10)).toEqual([]);
    });

    it("correctly filters when there are no nodes in the given direction", () => {
        expect(column.filter("right", (n) => n.rowId === 5)).toEqual([]);
    });
});
