import Node from "../../node/index";

describe("connect", () => {
    it("connects two singular nodes to each other", () => {
        const first = Node.createColumn(1);
        const second = Node.createColumn(2);

        first.connect("right", second);
        expect(first.right).toBe(second);
        expect(first.left).toBe(second);
        expect(second.left).toBe(first);
        expect(second.right).toBe(first);
    });

    it("connects two distinct groups of nodes to each other", () => {
        const first = Node.createColumn(1);
        const second = Node.createColumn(2);
        const third = Node.createColumn(3);
        const fourth = Node.createColumn(4);

        first.connect("right", second);
        third.connect("right", fourth);
        second.connect("right", third);

        expect(second.right).toBe(third);
        expect(third.left).toBe(second);
        expect(first.left).toBe(fourth);
        expect(fourth.right).toBe(first);
    });
});
