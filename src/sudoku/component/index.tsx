import * as React from "react";
import { Sudoku } from "../sudoku";
import createKeydownListener from "./keydownListener";
import styles from "./styles/Grid.module.scss";

declare module "../sudoku" {
    namespace Sudoku {
        export function Component(props: SudokuProps): JSX.Element;
    }
}

export type SudokuProps = {
    sudoku: number[][];
};

Sudoku.Component = function ({ sudoku }: SudokuProps): JSX.Element {
    const board = new Sudoku(sudoku);
    const [selected, setSelected] = React.useState(-1);

    const onKeydown = createKeydownListener(
        (value: number) => board.setValue(selected, value),
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

                                    return (
                                        <button
                                            key={cellId}
                                            className={styles.cell}
                                            onClick={() => setSelected(cellId)}
                                        >
                                            <svg
                                                className={styles.value}
                                                viewBox="0 0 16 16"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                width="1px"
                                            >
                                                <text
                                                    x="50%"
                                                    y="45%"
                                                    textAnchor="middle"
                                                    dominantBaseline="central"
                                                >
                                                    {value !== 0 && value}
                                                </text>
                                            </svg>
                                        </button>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
