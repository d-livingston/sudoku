import Network from "../../network";

describe("solve", () => {
    it("solves a network with only one solution", () => {
        const network = Network.from([
            [1, 0, 0, 0],
            [0, 1, 0, 1],
            [1, 1, 0, 1],
            [1, 0, 1, 0],
        ]);
        const { solution, hasMultipleSolutions } = network.solve();
        expect(solution).toContainEqual(expect.objectContaining({ rowId: 1 }));
        expect(solution).toContainEqual(expect.objectContaining({ rowId: 3 }));
        expect(hasMultipleSolutions).toBe(false);
    });

    it("solves a network with multiple solutions", () => {
        const network = Network.from([
            [1, 0, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [1, 0, 1, 0],
        ]);
        const { solution, hasMultipleSolutions } = network.solve();
        expect(solution).toContainEqual(expect.objectContaining({ rowId: 1 }));
        expect(solution).toContainEqual(expect.objectContaining({ rowId: 3 }));
        expect(hasMultipleSolutions).toBe(true);
    });
});
