import Network from "../../network";

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
