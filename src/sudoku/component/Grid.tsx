import * as React from "react";
import Cell from "./Cell";
import { selectCell, SudokuReducerAction, SudokuReducerState } from "./reducer";
import styles from "./Grid.module.scss";

export type GridProps = {
    state: SudokuReducerState;
    dispatch: React.Dispatch<SudokuReducerAction>;
};

export default function Grid({ state, dispatch }: GridProps): JSX.Element {
    const { board } = state;

    return (
        <div className={styles.container}>
            {state.isComplete && (
                <div className={styles.victory_banner}>
                    <h2>Congratulations!</h2>
                    <p>You solved the puzzle!</p>
                </div>
            )}
            <div className={styles.grid}>
                {board.getHouseIds().map((squareId) => {
                    const cellIds = board.getCellIdsInSquare(squareId);
                    return (
                        <div key={squareId} className={styles.square}>
                            {cellIds.map((cellId) => {
                                const value = board.getValue(cellId);
                                const isSelected =
                                    state.selected.cell === cellId;

                                const isInSameHouse =
                                    board.getRowId(cellId) ===
                                        state.selected.row ||
                                    board.getColumnId(cellId) ===
                                        state.selected.column ||
                                    board.getSquareId(cellId) ===
                                        state.selected.square;

                                return (
                                    <Cell
                                        key={`cell-${cellId}`}
                                        id={cellId}
                                        hasSameValue={
                                            value !== 0 &&
                                            value === state.selected.value
                                        }
                                        isInvalid={state.invalidCells.has(
                                            cellId
                                        )}
                                        isLocked={board.isLocked(cellId)}
                                        isSelected={isSelected}
                                        isInSameHouse={isInSameHouse}
                                        notes={state.notes[cellId]}
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
    );
}
