import NetworkSolver from "../network-solver";
import Network from "../network1";
import Node from "../node";

const matrix = [
    [0, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 1, 0],
];

describe("hasMultipleSolutions", () => {
    it("correctly determines a network with one solution only has one solution", () => {
        const networkSolver = new NetworkSolver(
            Network.from([
                [1, 0, 0, 0],
                [0, 1, 0, 1],
                [1, 1, 0, 1],
                [1, 0, 1, 0],
            ])
        );
        expect(networkSolver.hasMultipleSolutions()).toBe(false);
    });

    it("correctly determines a network with multiple solutions has multiple solutions", () => {
        const networkSolver = new NetworkSolver(
            Network.from([
                [1, 0, 0, 1],
                [0, 1, 0, 1],
                [0, 1, 0, 1],
                [1, 0, 1, 0],
            ])
        );
        expect(networkSolver.hasMultipleSolutions()).toBe(true);
    });
});

describe("solve", () => {
    it("correctly solves a basic network that only has one solution", () => {
        const networkSolver = new NetworkSolver(
            Network.from([
                [1, 0, 0, 0],
                [0, 1, 0, 1],
                [1, 1, 0, 1],
                [1, 0, 1, 0],
            ])
        );
        const solutions = networkSolver.solve();
        expect(solutions).toHaveLength(1);
        expect(solutions[0]).toContainEqual(
            expect.objectContaining({ rowId: 1 })
        );
        expect(solutions[0]).toContainEqual(
            expect.objectContaining({ rowId: 3 })
        );
    });

    it("correctly solves a basic network that has two solutions", () => {
        const networkSolver = new NetworkSolver(
            Network.from([
                [1, 0, 0, 1],
                [0, 1, 0, 1],
                [0, 1, 0, 1],
                [1, 0, 1, 0],
            ])
        );
        const solutions = networkSolver.solve();
        expect(solutions).toHaveLength(2);
        expect(solutions).toContainEqual(
            expect.arrayContaining([
                expect.objectContaining({ rowId: 1 }),
                expect.objectContaining({ rowId: 3 }),
            ])
        );
        expect(solutions).toContainEqual(
            expect.arrayContaining([
                expect.objectContaining({ rowId: 2 }),
                expect.objectContaining({ rowId: 3 }),
            ])
        );
    });

    describe("findOne flag", () => {
        it("correctly stops at one solution when the findOne flag is set", () => {
            const networkSolver = new NetworkSolver(
                Network.from([
                    [1, 0, 0, 1],
                    [0, 1, 0, 1],
                    [0, 1, 0, 1],
                    [1, 0, 1, 0],
                ])
            );
            const solutions = networkSolver.solve({ findOne: true });
            expect(solutions).toHaveLength(1);
        });
    });
});

describe("cover", () => {
    let network: Network;
    let networkSolver: NetworkSolver;
    beforeEach(() => {
        network = Network.from(matrix);
        networkSolver = new NetworkSolver();
        networkSolver.setNetwork(network);
    });

    it("correctly covers a column in the matrix", () => {
        networkSolver.cover(network.root.right);
        expect(network.toMatrix()).toEqual([
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 1],
            [0, 0, 0, 1, 1, 0],
        ]);
        expect(network.isFullyConnected()).toBe(true);
    });

    it("does nothing when the input is not a column", () => {
        networkSolver.cover(network.root.right.down);
        expect(network.toMatrix()).toEqual(matrix);
        expect(network.isFullyConnected()).toBe(true);
    });

    it("does nothing when the column has already been covered", () => {
        const covered = network.root.right;
        networkSolver.cover(covered);
        networkSolver.cover(covered);
        expect(network.toMatrix()).toEqual([
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 1],
            [0, 0, 0, 1, 1, 0],
        ]);
        expect(network.isFullyConnected()).toBe(true);
    });
});

describe("uncover", () => {
    let network: Network,
        networkSolver: NetworkSolver,
        covered: Node,
        coveredNode: Node;
    beforeEach(() => {
        network = Network.from(matrix);
        networkSolver = new NetworkSolver();
        networkSolver.setNetwork(network);
        covered = network.root.right;
        coveredNode = network.root.right.down;
        networkSolver.cover(covered);
    });

    it("correctly uncovers a column in the matrix that has already been covered", () => {
        networkSolver.uncover(covered);
        expect(network.toMatrix()).toEqual(matrix);
        expect(network.isFullyConnected()).toBe(true);
    });

    it("correctly does nothing when the node is not a column", () => {
        networkSolver.uncover(coveredNode);
        expect(network.toMatrix()).toEqual([
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 1],
            [0, 0, 0, 1, 1, 0],
        ]);
        expect(network.isFullyConnected()).toBe(true);
    });

    it("correctly does nothing when the column node is in the network", () => {
        networkSolver.uncover(network.root.right);
        expect(network.toMatrix()).toEqual([
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 1],
            [0, 0, 0, 1, 1, 0],
        ]);
        expect(network.isFullyConnected()).toBe(true);
    });
});

describe("remove", () => {
    let network: Network;
    let networkSolver: NetworkSolver;
    beforeEach(() => {
        network = Network.from(matrix);
        networkSolver = new NetworkSolver();
        networkSolver.setNetwork(network);
    });

    it("correctly removes a node in the matrix", () => {
        networkSolver.remove(network.root.right.down);
        expect(network.toMatrix()).toEqual([
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0],
        ]);
        expect(network.isFullyConnected()).toBe(true);
    });

    it("correctly does nothing when the node is a column", () => {
        networkSolver.remove(network.root.right);
        expect(network.toMatrix()).toEqual(matrix);
        expect(network.isFullyConnected()).toBe(true);
    });

    it("correctly does nothing when the node is not in the matrix", () => {
        const removed = network.root.right.down;
        networkSolver.remove(removed);
        networkSolver.remove(removed);
        expect(network.toMatrix()).toEqual([
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0],
        ]);
        expect(network.isFullyConnected()).toBe(true);
    });
});

describe("unremove", () => {
    let network: Network,
        networkSolver: NetworkSolver,
        removed: Node,
        removedColumn: Node;
    beforeEach(() => {
        network = Network.from(matrix);
        networkSolver = new NetworkSolver();
        networkSolver.setNetwork(network);
        removed = network.root.right.down;
        removedColumn = network.root.right;
        networkSolver.remove(removed);
    });

    it("correctly unremoves a node in the network that has already been removed", () => {
        networkSolver.unremove(removed);
        expect(network.toMatrix()).toEqual(matrix);
        expect(network.isFullyConnected()).toBe(true);
    });

    it("does nothing when trying to unremove a column", () => {
        networkSolver.unremove(removedColumn);
        expect(network.toMatrix()).toEqual([
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0],
        ]);
        expect(network.isFullyConnected()).toBe(true);
    });

    it("does nothing when trying to unremove a node that is still in the network", () => {
        networkSolver.unremove(network.root.right.down);
        expect(network.toMatrix()).toEqual([
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0],
        ]);
        expect(network.isFullyConnected()).toBe(true);
    });
});

describe("hide", () => {
    let network: Network;
    let networkSolver: NetworkSolver;
    beforeEach(() => {
        network = Network.from(matrix);
        networkSolver = new NetworkSolver();
        networkSolver.setNetwork(network);
    });

    it("correctly hides a node in the network", () => {
        networkSolver.hide(network.root.right.down);
        expect(network.toMatrix()).toEqual([
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0, 0],
            [0, 0, 1, 1, 0, 1],
            [0, 0, 0, 1, 1, 0],
        ]);
        expect(network.isFullyConnected()).toBe(true);
    });

    it("does nothing when the input is not a column", () => {
        networkSolver.hide(network.root.right);
        expect(network.toMatrix()).toEqual(matrix);
        expect(network.isFullyConnected()).toBe(true);
    });

    it("does nothing when the column has already been covered", () => {
        const hidden = network.root.right.down;
        networkSolver.hide(hidden);
        networkSolver.hide(hidden);
        expect(network.toMatrix()).toEqual([
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0, 0],
            [0, 0, 1, 1, 0, 1],
            [0, 0, 0, 1, 1, 0],
        ]);
        expect(network.isFullyConnected()).toBe(true);
    });
});

describe("unhide", () => {
    let network: Network, networkSolver: NetworkSolver, hidden: Node;
    beforeEach(() => {
        network = Network.from(matrix);
        networkSolver = new NetworkSolver();
        networkSolver.setNetwork(network);
        hidden = network.root.right.down;
        networkSolver.hide(hidden);
    });

    it("correctly unhides a node in the network that has already been hidden", () => {
        networkSolver.unhide(hidden);
        expect(network.toMatrix()).toEqual(matrix);
        expect(network.isFullyConnected()).toBe(true);
    });

    it("correctly does nothing when the node is in the network", () => {
        networkSolver.unhide(network.root.right.down);
        expect(network.toMatrix()).toEqual([
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0, 0],
            [0, 0, 1, 1, 0, 1],
            [0, 0, 0, 1, 1, 0],
        ]);
        expect(network.isFullyConnected()).toBe(true);
    });
});

describe("undo/reset", () => {
    let network: Network,
        networkSolver: NetworkSolver,
        matrixAfterFirst: number[][],
        matrixAfterSecond: number[][];
    beforeEach(() => {
        network = Network.from(matrix);
        networkSolver = new NetworkSolver(network);
        networkSolver.hide(network.root.right.down);
        matrixAfterFirst = network.toMatrix();
        networkSolver.remove(network.root.left.left.down);
        matrixAfterSecond = network.toMatrix();
        networkSolver.cover(network.root.right);
    });

    it("correctly undo-s the last event", () => {
        networkSolver.undo();
        expect(network.toMatrix()).toEqual(matrixAfterSecond);
        expect(network.isFullyConnected()).toBe(true);
        networkSolver.undo();
        expect(network.toMatrix()).toEqual(matrixAfterFirst);
        expect(network.isFullyConnected()).toBe(true);
        networkSolver.undo();
        expect(network.toMatrix()).toEqual(matrix);
        expect(network.isFullyConnected()).toBe(true);
    });

    it("correctly resets the network", () => {
        networkSolver.reset();
        expect(network.toMatrix()).toEqual(matrix);
        expect(network.isFullyConnected()).toBe(true);
    });
});
