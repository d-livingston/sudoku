import {
    createNotes,
    deleteCellNotes,
    toggleNote,
} from "../../../sudoku/component/notes";

describe("createNotes", () => {
    it("creates an 'empty' notes structure", () => {
        const notes = createNotes(9);
        expect(
            notes.every((cellNotes) =>
                cellNotes.every((note) => note === false)
            )
        ).toBe(true);
    });
});

describe("toggleNote", () => {
    it("toggles a note on", () => {
        const notes = toggleNote(createNotes(9), 0, 1);
        expect(notes[0][0]).toEqual(true);
    });

    it("toggles a note back off", () => {
        const notes = toggleNote(toggleNote(createNotes(9), 0, 1), 0, 1);
        expect(notes[0][0]).toEqual(false);
    });
});

describe("deleteCellNotes", () => {
    it("deletes all notes in the cell", () => {
        const notes = deleteCellNotes(toggleNote(createNotes(9), 0, 1), 0);
        expect(notes[0].every((note) => note === false));
    });
});
