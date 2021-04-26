import Network from "../network";
import Node from "../node";

describe("from", () => {
    const matrix = [
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 0, 0],
        [0, 0, 1, 1, 0, 1],
        [0, 0, 0, 1, 1, 0],
    ];

    const networkFromMatrix = Network.from(matrix);

    it("constructs a network that matches the matrix", () => {
        expect(networkFromMatrix.toMatrix()).toEqual(matrix);
    });

    it("constructs a fully connected network", () => {
        expect(networkFromMatrix.isFullyConnected()).toBe(true);
    });
});

describe("find", () => {
    const network = Network.from([
        [1, 0, 0],
        [0, 1, 1],
    ]);

    it("finds a column when specified and one exists that matches", () => {
        expect(network.find((c: Node) => c.columnId === 2)).toEqual(
            network.root.left
        );
    });

    it("finds a node when specified and one exists that matches", () => {
        expect(
            network.find((n: Node) => n.columnId === 0, { isColumn: false })
        ).toEqual(network.root.right.down);
    });

    it("correctly excludes nodes outside the range", () => {
        expect(
            network.find((c: Node) => c.columnId === 0, { minColumn: 1 })
        ).toBeUndefined();
        expect(
            network.find((n: Node) => n.columnId === 2, { maxColumn: 2 })
        ).toBeUndefined();
    });

    it("returns undefined when no such nodes exist", () => {
        expect(network.find((c: Node) => c.rowId === 1)).toBeUndefined();
    });
});

describe("filter", () => {
    const network = Network.from([
        [1, 0, 0],
        [0, 1, 1],
    ]);

    it("finds all columns when specified and such columns exist", () => {
        expect(network.filter((c: Node) => c.columnId < 2)).toEqual([
            network.root.right,
            network.root.right.right,
        ]);
    });

    it("finds all nodes when specified and such nodes exist", () => {
        expect(
            network.filter((n: Node) => n.columnId < 2, { isColumn: false })
        ).toEqual([network.root.right.down, network.root.right.right.down]);
    });

    it("correctly excludes nodes outside the range", () => {
        expect(
            network.filter((c: Node) => c.columnId <= 1, { minColumn: 1 })
        ).toEqual([network.root.right.right]);
        expect(
            network.filter((c: Node) => c.columnId <= 1, { maxColumn: 1 })
        ).toEqual([network.root.right]);
    });

    it("returns an empty array when no such nodes exist", () => {
        expect(network.filter((c: Node) => c.rowId === 1)).toEqual([]);
    });
});
