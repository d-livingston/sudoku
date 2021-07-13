export type State = {
    initial: number[][];
    sudoku: number[][];
    selected: {
        cell: number;
        row: number;
        column: number;
        square: number;
        value: number;
    };
};
