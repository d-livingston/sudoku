import Node from "../../node/index";

describe("forEach", () => {
    let c1: Node, c2: Node, c3: Node, c4: Node;
    beforeAll(() => {
        c1 = Node.createColumn(1);
        c2 = Node.createColumn(2);
        c3 = Node.createColumn(3);
        c4 = Node.createColumn(4);
        c1.connect("right", c2);
        c2.connect("right", c3);
        c3.connect("right", c4);

        expect(c1.right).toBe(c2);
        expect(c2.right).toBe(c3);
        expect(c3.right).toBe(c4);
        expect(c4.right).toBe(c1);
    });

    it("calls the given function with every node in the given direction", () => {
        const callback = jest.fn();
        c1.forEach("right", callback);
        expect(callback).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenCalledWith(c2);
        expect(callback).toHaveBeenCalledWith(c3);
        expect(callback).toHaveBeenCalledWith(c4);
    });

    it("does not call the function when there are no nodes in the given direction", () => {
        const callback = jest.fn();
        c1.forEach("down", callback);
        expect(callback).not.toHaveBeenCalled();
    });
});
