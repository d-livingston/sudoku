import Network from "../../network";

describe("filter", () => {
    const network = Network.from([
        [1, 0, 0],
        [0, 1, 1],
    ]);

    it("finds all columns when specified and such columns exist", () => {
        expect(network.filter((c) => c.columnId < 2)).toEqual([
            network.root.right,
            network.root.right.right,
        ]);
    });

    it("finds all nodes when specified and such nodes exist", () => {
        expect(
            network.filter((n) => n.columnId < 2, { isColumn: false })
        ).toEqual([network.root.right.down, network.root.right.right.down]);
    });

    it("correctly excludes nodes outside the range", () => {
        expect(
            network.filter((c) => c.columnId <= 1, { minColumn: 1 })
        ).toEqual([network.root.right.right]);
        expect(
            network.filter((c) => c.columnId <= 1, { maxColumn: 1 })
        ).toEqual([network.root.right]);
    });

    it("returns an empty array when no such nodes exist", () => {
        expect(network.filter((c) => c.rowId === 1)).toEqual([]);
    });
});
