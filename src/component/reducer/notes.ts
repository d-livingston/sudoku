type SudokuNotes = {
    [key: number]: CellNotes;
};

type CellNotes = {
    [key: number]: boolean;
};

export default class Notes {
    private notes: SudokuNotes = {};
    private size: number;

    constructor(size: number) {
        this.size = size;
    }

    public toggle(cell: number, value: number) {
        if (typeof this.notes[cell] === "undefined") {
            this.notes[cell] = {};
        }

        if (!this.notes[cell][value]) {
            this.notes[cell][value] = true;
        } else {
            this.notes[cell][value] = false;
        }
    }

    public remove(cell: number) {
        if (typeof this.notes[cell] === "undefined") return;

        this.notes[cell] = {};
    }

    public get(cell: number): boolean[] {
        return Array.from({ length: this.size }, (_, i) => i + 1).map(
            (value) => this.notes[cell] && this.notes[cell][value]
        );
    }
}

export type { Notes };
