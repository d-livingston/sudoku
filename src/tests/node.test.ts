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
        const mockPredicate = jest.fn((n: Node) => n.rowId === 4);
        const result = column.find("down", mockPredicate);
        expect(mockPredicate).toHaveBeenCalledTimes(2);
        expect(mockPredicate.mock.results[0].value).toBe(false);
        expect(mockPredicate.mock.results[1].value).toBe(true);
        expect(result).toEqual(column.down.down);
    });

    it("returns undefined when no node exists in the given direction", () => {
        const mockPredicate = jest.fn((n: Node) => n.rowId === 7);
        expect(column.find("down", mockPredicate)).toBeUndefined();
        expect(mockPredicate).toHaveBeenCalledTimes(3);
    });

    it("returns undefined when there are no nodes in the given direction", () => {
        const mockPredicate = jest.fn((n: Node) => n.rowId === 4);
        expect(column.find("right", mockPredicate)).toBeUndefined();
        expect(mockPredicate).not.toHaveBeenCalled();
    });
});

describe("filter", () => {
    it("correctly filters nodes when there are nodes in the given direction", () => {
        const mockPredicate = jest.fn((n: Node) => n.rowId < 8);
        expect(column.filter("down", mockPredicate)).toEqual([
            column.down,
            column.down.down,
        ]);
        expect(mockPredicate).toHaveBeenCalledTimes(3);
    });

    it("correctly filters nodes when there are no nodes that match the predicate", () => {
        const mockPredicate = jest.fn((n: Node) => n.rowId > 10);
        expect(column.filter("down", mockPredicate)).toEqual([]);
        expect(mockPredicate).toHaveBeenCalledTimes(3);
    });

    it("correctly filters when there are no nodes in the given direction", () => {
        const mockPredicate = jest.fn((n: Node) => n.rowId > 11);
        expect(column.filter("right", mockPredicate)).toEqual([]);
    });
});

describe("forEach", () => {
    it("correctly executes the callback function for each node in the direction", () => {
        const mockCallback = jest.fn((_: Node) => {});
        column.forEach("down", mockCallback);
        expect(mockCallback).toHaveBeenCalledTimes(3);
    });
});
