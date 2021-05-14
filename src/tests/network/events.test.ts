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
        it("covers a column in the network", async () => {
            const column = network.root.right;
            await network.dispatch(NetworkEventType.Cover, column);
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

        it("throws a TypeError when no node is provided and does nothing", async () => {
            expect(network.dispatch(NetworkEventType.Cover)).rejects.toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("throws a TypeError when a regular node is provided and does nothing", async () => {
            const node = network.root.right.down;
            expect(
                network.dispatch(NetworkEventType.Cover, node)
            ).rejects.toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("throws a TypeError when the root node is provided and does nothing", async () => {
            expect(
                network.dispatch(NetworkEventType.Cover, network.root)
            ).rejects.toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });
    });

    describe("Event type: Remove", () => {
        it("removes a node in the network", async () => {
            const node = network.root.right.down;
            await network.dispatch(NetworkEventType.Remove, node);
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

        it("throws a TypeError when no node is provided and does nothing", async () => {
            expect(network.dispatch(NetworkEventType.Remove)).rejects.toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("throws a TypeError when a column node is provided and does nothing", async () => {
            const column = network.root.right;
            expect(
                network.dispatch(NetworkEventType.Remove, column)
            ).rejects.toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("throws a TypeError when the root node is provided and does nothing", async () => {
            expect(
                network.dispatch(NetworkEventType.Remove, network.root)
            ).rejects.toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });
    });

    describe("Event type: Hide", () => {
        it("hides a node in the network", async () => {
            const node = network.root.right.down;
            await network.dispatch(NetworkEventType.Hide, node);
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

        it("throws a TypeError when no node is provided and does nothing", async () => {
            expect(network.dispatch(NetworkEventType.Hide)).rejects.toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("throws a TypeError when a column node is provided and does nothing", async () => {
            const column = network.root.right;
            expect(
                network.dispatch(NetworkEventType.Hide, column)
            ).rejects.toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("throws a TypeError when the root node is provided and does nothing", async () => {
            expect(
                network.dispatch(NetworkEventType.Hide, network.root)
            ).rejects.toThrow();
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });
    });

    describe("Event type: Undo", () => {
        it("un-does the cover event", async () => {
            const column = network.root.right;
            await network.dispatch(NetworkEventType.Cover, column);
            await network.dispatch(NetworkEventType.Undo);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("un-does the remove event", async () => {
            const node = network.root.right.down;
            await network.dispatch(NetworkEventType.Remove, node);
            await network.dispatch(NetworkEventType.Undo);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("un-does the hide event", async () => {
            const node = network.root.right.down;
            await network.dispatch(NetworkEventType.Hide, node);
            await network.dispatch(NetworkEventType.Undo);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("does nothing if the network history is empty", async () => {
            await network.dispatch(NetworkEventType.Undo);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });
    });

    describe("Event type: Reset", () => {
        it("resets the network", async () => {
            await network.dispatch(
                NetworkEventType.Hide,
                network.root.right.down
            );
            await network.dispatch(
                NetworkEventType.Remove,
                network.root.left.left.down
            );
            await network.dispatch(NetworkEventType.Cover, network.root.right);

            await network.dispatch(NetworkEventType.Reset);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });

        it("does nothing if the network history is empty", async () => {
            await network.dispatch(NetworkEventType.Reset);
            expect(network.isFullyConnected()).toBe(true);
            expect(network.toMatrix()).toEqual(matrix);
            expect(network.networkHistory).toHaveLength(0);
        });
    });
});
