import Network, { NetworkEventType } from "../../network";

describe("dispatch", () => {
    const matrix = [
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 0, 0],
        [0, 0, 1, 1, 0, 1],
        [0, 0, 0, 1, 1, 0],
    ];

    let network: Network;
    beforeEach(() => {
        network = Network.from(matrix);
        expect(network.isFullyConnected()).toBe(true);
        expect(network.toMatrix()).toEqual(matrix);
    });

    describe("Event type: Cover", () => {
        it("covers a column in the network", () => {
            const column = network.root.right;
            network.dispatch(NetworkEventType.Cover, column);
            expect(network.toMatrix()).toEqual([
                [0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0, 1],
                [0, 0, 0, 1, 1, 0],
            ]);
            expect(network.networkHistory).toEqual([
                { type: NetworkEventType.Cover, node: column },
            ]);
        });

        it("throws a TypeError when no node is provided and does nothing", () => {
            expect(() => network.dispatch(NetworkEventType.Cover)).toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("throws a TypeError when a regular node is provided and does nothing", () => {
            const node = network.root.right.down;
            expect(() =>
                network.dispatch(NetworkEventType.Cover, node)
            ).toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("throws a TypeError when the root node is provided and does nothing", () => {
            expect(() =>
                network.dispatch(NetworkEventType.Cover, network.root)
            ).toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });
    });

    describe("Event type: Remove", () => {
        it("removes a node in the network", () => {
            const node = network.root.right.down;
            network.dispatch(NetworkEventType.Remove, node);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual([
                [0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 0],
            ]);
            expect(network.networkHistory).toEqual([
                { type: NetworkEventType.Remove, node },
            ]);
        });

        it("throws a TypeError when no node is provided and does nothing", () => {
            expect(() => network.dispatch(NetworkEventType.Remove)).toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("throws a TypeError when a column node is provided and does nothing", () => {
            const column = network.root.right;
            expect(() =>
                network.dispatch(NetworkEventType.Remove, column)
            ).toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("throws a TypeError when the root node is provided and does nothing", () => {
            expect(() =>
                network.dispatch(NetworkEventType.Remove, network.root)
            ).toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });
    });

    describe("Event type: Hide", () => {
        it("hides a node in the network", () => {
            const node = network.root.right.down;
            network.dispatch(NetworkEventType.Hide, node);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual([
                [0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [1, 1, 0, 1, 0, 0],
                [0, 0, 1, 1, 0, 1],
                [0, 0, 0, 1, 1, 0],
            ]);
            expect(network.networkHistory).toEqual([
                { type: NetworkEventType.Hide, node },
            ]);
        });

        it("throws a TypeError when no node is provided and does nothing", () => {
            expect(() => network.dispatch(NetworkEventType.Hide)).toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("throws a TypeError when a column node is provided and does nothing", () => {
            const column = network.root.right;
            expect(() =>
                network.dispatch(NetworkEventType.Hide, column)
            ).toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("throws a TypeError when the root node is provided and does nothing", () => {
            expect(() =>
                network.dispatch(NetworkEventType.Hide, network.root)
            ).toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });
    });

    describe("Event type: Undo", () => {
        it("un-does the cover event", () => {
            const column = network.root.right;
            network.dispatch(NetworkEventType.Cover, column);
            network.dispatch(NetworkEventType.Undo);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("un-does the remove event", () => {
            const node = network.root.right.down;
            network.dispatch(NetworkEventType.Remove, node);
            network.dispatch(NetworkEventType.Undo);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("un-does the hide event", () => {
            const node = network.root.right.down;
            network.dispatch(NetworkEventType.Hide, node);
            network.dispatch(NetworkEventType.Undo);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("does nothing if the network history is empty", () => {
            network.dispatch(NetworkEventType.Undo);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });
    });

    describe("Event type: Reset", () => {
        it("resets the network", () => {
            network.dispatch(NetworkEventType.Hide, network.root.right.down);
            network.dispatch(
                NetworkEventType.Remove,
                network.root.left.left.down
            );
            network.dispatch(NetworkEventType.Cover, network.root.right);

            network.dispatch(NetworkEventType.Reset);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("does nothing if the network history is empty", () => {
            network.dispatch(NetworkEventType.Reset);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });
    });
});
