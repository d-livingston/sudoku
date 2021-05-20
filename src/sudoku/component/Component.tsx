import * as React from "react";
import { Sudoku } from "../sudoku";
import { Cell } from "./Cell";
import createKeydownListener from "./keydownListener";
import { useSudokuReducer, selectCell } from "./reducer";
import styles from "./styles/Grid.module.scss";

export type ComponentProps = {
    sudoku: number[][];
};

export function Component({ sudoku }: ComponentProps): JSX.Element {
    const [state, dispatch] = useSudokuReducer(sudoku);
    const board = new Sudoku(sudoku);

    const onKeydown = createKeydownListener(
        () => {},
        () => {},
        () => {},
        () => {}
    );
    React.useEffect(() => {
        window.addEventListener("keydown", onKeydown);

        return () => {
            window.removeEventListener("keydown", onKeydown);
        };
    }, [onKeydown]);

    return (
        <div className={styles.container}>
            <div className={styles.grid__container}>
                <div className={styles.grid}>
                    {board.getHouseIds().map((squareId) => {
                        const cellIds = board.getCellIdsInSquare(squareId);
                        return (
                            <div key={squareId} className={styles.square}>
                                {cellIds.map((cellId) => {
                                    const value = board.getValue(cellId);

                                    const isInSameHouse =
                                        board.getRowId(cellId) ===
                                            state.selected.row ||
                                        board.getColumnId(cellId) ===
                                            state.selected.column ||
                                        board.getSquareId(cellId) ===
                                            state.selected.square;

                                    return (
                                        <Cell
                                            id={cellId}
                                            hasSameValue={
                                                value !== 0 &&
                                                value === state.selected.value
                                            }
                                            isSelected={
                                                state.selected.cell === cellId
                                            }
                                            isInSameHouse={isInSameHouse}
                                            onClick={(cell: number) =>
                                                dispatch(selectCell(cell))
                                            }
                                            value={value}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
