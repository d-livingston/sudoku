import Node from "../../node/index";

describe("find", () => {
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

    it("finds a node in the given direction matching the predicate", () => {
        expect(c1.find("right", (n) => n.columnId === 2)).toBe(c2);
        expect(c1.find("left", (n) => n.columnId === 2)).toBe(c2);
    });

    it("returns undefined when only the given node matches", () => {
        expect(c1.find("right", (n) => n.columnId === 1)).toBeUndefined();
        expect(c1.find("left", (n) => n.columnId === 1)).toBeUndefined();
        expect(c1.find("down", (n) => n.columnId === 1)).toBeUndefined();
        expect(c1.find("up", (n) => n.columnId === 1)).toBeUndefined();
    });
});
