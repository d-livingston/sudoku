import Network from "../../network";
import Node from "../../node";

describe("reduce", () => {
    const network = Network.from([
        [1, 1, 0],
        [0, 1, 1],
    ]);

    describe("default options", () => {
        it("reduces the network to a single value", () => {
            expect(
                network.reduce<Node>((acc, c) => {
                    if (!acc) return c;
                    else return acc.size > c.size ? acc : c;
                })
            ).toBe(network.root.right.right);
        });
    });

    describe("with isColumn false", () => {
        it("reduces the network to a single value", () => {
            expect(
                network.reduce<Node>(
                    (acc, c) => {
                        if (!acc) return c;
                        else
                            return c.rowId + c.columnId <
                                acc.rowId + acc.columnId
                                ? acc
                                : c;
                    },
                    { isColumn: false }
                )
            ).toBe(network.root.left.down);
        });
    });

    describe("with minColumn specified", () => {
        it("reduces the network to a single value", () => {
            expect(
                network.reduce<Node>(
                    (acc, c) => {
                        if (!acc) return c;
                        else return acc.size > c.size ? acc : c;
                    },
                    { minColumn: 2 }
                )
            ).toBe(network.root.left);
        });
    });

    describe("with maxColumn specified", () => {
        it("reduces the network to a single value", () => {
            expect(
                network.reduce<Node>(
                    (acc, c) => {
                        if (!acc) return c;
                        else return acc.size > c.size ? acc : c;
                    },
                    { maxColumn: 1 }
                )
            ).toBe(network.root.right);
        });
    });
});
