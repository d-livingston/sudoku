import Node from "../../node";

describe("every", () => {
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

    it("determines if every node in the given direction matches the predicate", () => {
        expect(c1.every("right", (n) => n.columnId < 5)).toBe(true);
        expect(c1.every("left", (n) => n.columnId > 4)).toBe(false);
    });

    it("returns true if there are no nodes in the given direction", () => {
        expect(c1.every("down", (n) => n.columnId === 1)).toBe(true);
    });
});
