export type CellNotes = boolean[];
export type Notes = CellNotes[];

export function createNotes(size: number): Notes {
    return Array.from({ length: size * size }, () =>
        Array.from({ length: size }, () => false)
    );
}

export function toggleNote(notes: Notes, cell: number, value: number): Notes {
    const newNotes = copyNotes(notes);
    newNotes[cell][value - 1] = !newNotes[cell][value - 1];
    return newNotes;
}

export function deleteCellNotes(notes: Notes, cell: number): Notes {
    const newNotes = copyNotes(notes);
    newNotes[cell] = newNotes[cell].map(() => false);
    return newNotes;
}

function copyNotes(notes: Notes): Notes {
    return notes.map((cellNotes) => [...cellNotes]);
}
