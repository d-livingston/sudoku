type NodeOptions =
    | {
          column: Node;
          rowId: number;
      }
    | number;

export class Node {
    public readonly rowId: number;
    public readonly columnId: number;
    public readonly column: Node;
    public readonly isColumn: boolean;
    public size: number;

    private _left?: Node;
    private _right?: Node;
    private _up?: Node;
    private _down?: Node;

    static createRoot(): Node {
        return new Node();
    }

    static createColumn(columnId: number): Node {
        return new Node(columnId);
    }

    static createNode(options: { column: Node; rowId: number }): Node {
        return new Node(options);
    }

    private constructor(options?: NodeOptions) {
        if (!options) {
            this.column = this;
            this.columnId = -1;
            this.isColumn = false;
            this.rowId = -1;
        } else if (typeof options === "number") {
            this.columnId = options;
            this.isColumn = true;
            this.column = this;
            this.size = 0;
            this.rowId = -1;
        } else {
            const { column, rowId } = options;
            this.columnId = column.columnId;
            this.column = column;
            this.rowId = rowId;
            this.isColumn = false;
        }
    }

    get left(): Node {
        return this._left ? this._left : this;
    }

    set left(n: Node) {
        this._left = n;
    }

    get right(): Node {
        return this._right ? this._right : this;
    }

    set right(n: Node) {
        this._right = n;
    }

    get up(): Node {
        return this._up ? this._up : this;
    }

    set up(n: Node) {
        this._up = n;
    }

    get down(): Node {
        return this._down ? this._down : this;
    }

    set down(n: Node) {
        this._down = n;
    }

    get info() {
        return {
            rowId: this.rowId,
            columnId: this.columnId,
        };
    }

    toJSON() {
        return {
            ...this.info,
            left: this.left === this ? "self" : { ...this.left.info },
            right: this.right === this ? "self" : { ...this.right.info },
            down: this.down === this ? "self" : { ...this.down.info },
            up: this.up === this ? "self" : { ...this.up.info },
            column: this.column
                ? this.column === this
                    ? "self"
                    : { ...this.column.info }
                : "none",
            isColumn: this.isColumn,
            size: this.size,
        };
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }
}
