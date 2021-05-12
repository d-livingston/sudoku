import Network from "../../network";

describe("find", () => {
    const network = Network.from([
        [1, 0, 0],
        [0, 1, 1],
    ]);

    describe("default options", () => {
        it("finds the correct node when one matches the predicate", () => {
            expect(network.find((c) => c.columnId === 2)).toBe(
                network.root.left
            );
        });

        it("returns undefined when no node matches", () => {
            expect(network.find((c) => c.columnId === 4)).toBeUndefined();
        });
    });

    describe("with isColumn false", () => {
        it("finds the correct node when one matches the predicate", () => {
            expect(
                network.find((n) => n.columnId === 2, { isColumn: false })
            ).toBe(network.root.left.down);
        });

        it("returns undefined when no node matches", () => {
            expect(
                network.find((n) => n.columnId === 4, { isColumn: false })
            ).toBeUndefined();
        });
    });

    describe("with minColumn specified", () => {
        it("finds the correct node when one matches the predicate", () => {
            expect(
                network.find((c) => c.columnId === 2, { minColumn: 2 })
            ).toBe(network.root.left);
        });

        it("returns undefined when no node matches", () => {
            expect(
                network.find((c) => c.columnId === 2, { minColumn: 3 })
            ).toBeUndefined();
        });
    });

    describe("with maxColumn specified", () => {
        it("finds the correct node when one matches the predicate", () => {
            expect(
                network.find((c) => c.columnId === 2, { maxColumn: 3 })
            ).toBe(network.root.left);
        });

        it("returns undefined when no node matches", () => {
            expect(
                network.find((c) => c.columnId === 2, { maxColumn: 2 })
            ).toBeUndefined();
        });
    });
});
