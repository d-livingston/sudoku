import { Notes } from "./types";

export function createNotes(size: number): Notes {
    return Array.from({ length: size * size }, () =>
        Array.from({ length: size }, () => false)
    );
}

export function toggleNote(notes: Notes, cell: number, value: number): Notes {
    notes[cell][value - 1] = !notes[cell][value - 1];
    return notes;
}

export function deleteNote(notes: Notes, cell: number): Notes {
    const newNotes = copyNotes(notes);
    newNotes[cell] = newNotes[cell].map(() => false);
    return newNotes;
}

function copyNotes(notes: Notes): Notes {
    return notes.map((cellNotes) => [...cellNotes]);
}
