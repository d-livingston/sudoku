import Notes from "../../../component/reducer/notes";

it("toggles a note on and off", () => {
    const notes = new Notes(9);
    expect(notes.get(4)).not.toContain(true);

    notes.toggle(4, 1);
    expect(notes.get(4)[0]).toBe(true);

    notes.toggle(4, 1);
    expect(notes.get(4)).not.toContain(true);
});

it("removes all notes from a cell", () => {
    const notes = new Notes(9);
    notes.toggle(4, 1);
    notes.toggle(4, 5);
    expect(notes.get(4)).toContain(true);
    notes.remove(4);
    expect(notes.get(4)).not.toContain(true);
});

it("does nothing when you remove a cell when there are no notes", () => {
    const notes = new Notes(9);
    notes.remove(4);
    expect(notes.get(4)).not.toContain(true);
});
