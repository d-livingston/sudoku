export default class Node {
    // Values
    public readonly rowId: number;
    public readonly columnId: number;

    // Node relationships
    public column: Column;
    public left: Node;
    public right: Node;
    public up: Node | Column;
    public down: Node | Column;

    public constructor(rowId: number, columnId: number) {
        this.rowId = rowId;
        this.columnId = columnId;
    }

    public isColumn(): boolean {
        return this instanceof Column;
    }

    public isRoot(): boolean {
        return this instanceof Root;
    }

    // Removes the row containing the node
    public removeRow(): void {
        let node: Node = this.right;
        while (node !== this) {
            node.column.cover();
            node = node.right;
        }
        this.column.cover();
    }

    // Puts back the row containing the node
    public replaceRow(): void {
        this.column.uncover();
        let node: Node = this.left;
        while (node !== this) {
            node.column.uncover();
            node = node.left;
        }
    }
}

export class Column extends Node {
    public size: number = 0;

    public left: Column | Root;
    public right: Column | Root;
    public up: Node;
    public down: Node;

    public constructor(columnId: number) {
        super(-1, columnId);
    }

    // Covers a column
    public cover(): void {
        this.right.left = this.left;
        this.left.right = this.right;
        let node: Node | Column = this.down;
        while (!node.isColumn()) {
            let r: Node = node.right;
            while (r !== node) {
                r.down.up = r.up;
                r.up.down = r.down;
                r.column.size--;
                r = r.right;
            }
            node = node.down;
        }
    }

    // Reverses the cover
    public uncover(): void {
        let node: Node | Column = this.up;
        while (!node.isColumn()) {
            let r: Node = node.left;
            while (r !== node) {
                r.column.size++;
                r.up.down = r;
                r.down.up = r;
                r = r.left;
            }
            node = node.up;
        }
        this.left.right = this;
        this.right.left = this;
    }
}

export class Root extends Column {
    public left: Column;
    public right: Column;
    public up: Root;
    public down: Root;

    public constructor() {
        super(-1);
    }

    public cover(): void {}
    public uncover(): void {}
}

export type { Node };
