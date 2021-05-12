import Node from "../../node/index";

describe("reduce", () => {
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

    it("reduces the nodes in the given direction to a single value", () => {
        expect(
            c1.reduce("right", (acc: number, n) =>
                acc ? n.columnId + acc : n.columnId
            )
        ).toBe(9);
        expect(
            c1.reduce("right", (acc: number, n) => n.columnId + acc, 100)
        ).toBe(109);
    });

    it("does nothing when there are no nodes in the given direction", () => {
        const callback = jest.fn();
        expect(c1.reduce("down", callback)).toBeUndefined();
        expect(callback).not.toHaveBeenCalled();
    });
});
