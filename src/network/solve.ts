import { Network } from "./network";
import Node from "../node";
import "./events";
import "./reduce";
import { NetworkSolution, NetworkEventType } from "./types";

declare module "./network" {
    interface Network {
        solve(): Promise<NetworkSolution>;
        solveSync(): NetworkSolution;
    }
}

Network.prototype.solve = async function (): Promise<NetworkSolution> {
    const historyStartLength = this.networkHistory.length;
    const solutionStartLength = this.currentSolutionState.length;

    try {
        let hasMultipleSolutions: boolean = false;
        let solution: Node[] = [];
        let nodesTried = 0;

        const onSolutionFound = (sol: Node[]) => {
            if (solution.length === 0) {
                solution = [...sol];
            } else {
                hasMultipleSolutions = true;
            }
        };
        const assertStopSolving = () => hasMultipleSolutions;
        const onColumnChoice = () => nodesTried++;

        await search(this, {
            onSolutionFound,
            assertStopSolving,
            onColumnChoice,
        });

        return {
            solution,
            hasMultipleSolutions,
            nodesTried,
        };
    } catch {
        // Return the network to its initial state and return default values.
        while (this.networkHistory.length > historyStartLength) {
            await this.dispatch(NetworkEventType.Undo);
        }
        while (this.currentSolutionState.length > solutionStartLength) {
            this.currentSolutionState.pop();
        }
        return {
            solution: [],
            hasMultipleSolutions: false,
            nodesTried: 0,
        };
    }
};

Network.prototype.solveSync = function (): NetworkSolution {
    let hasMultipleSolutions: boolean = false;
    let solution: Node[] = [];
    let nodesTried = 0;

    const onSolutionFound = (sol: Node[]) => {
        if (solution.length === 0) {
            solution = [...sol];
        } else {
            hasMultipleSolutions = true;
        }
    };
    const assertStopSolving = () => hasMultipleSolutions;
    const onColumnChoice = () => nodesTried++;

    searchSync(this, {
        onSolutionFound,
        assertStopSolving,
        onColumnChoice,
    });

    return {
        solution,
        hasMultipleSolutions,
        nodesTried,
    };
};

type SearchOptions = {
    assertStopSolving: () => boolean;
    onSolutionFound: (solution: Node[]) => void;
    onColumnChoice: (c: Node) => void;
};

const search = async (
    network: Network,
    { assertStopSolving, onSolutionFound, onColumnChoice }: SearchOptions
): Promise<void> => {
    if (assertStopSolving()) return;
    if (network.isEmpty()) {
        // Current iteration is complete and a solution is found
        onSolutionFound(network.currentSolutionState);
    } else {
        // Find the next smallest column and cover it.
        // Try each node in the column as part of the solution.
        const column = network.reduce<Node>((acc, c) => {
            if (!acc) return c;
            return c.size < acc.size ? c : acc;
        });
        if (!column || column.size === 0)
            throw new Error("Internal network error.");
        onColumnChoice(column);

        await network.dispatch(NetworkEventType.Cover, column);
        column.forEach("down", (r) => {
            network.currentSolutionState.push(r);
            r.forEach("right", (j) =>
                network.dispatchSync(NetworkEventType.Cover, j.column)
            );
            searchSync(network, {
                assertStopSolving,
                onSolutionFound,

                onColumnChoice,
            });
            r.forEach("left", () =>
                network.dispatchSync(NetworkEventType.Undo)
            );
            network.currentSolutionState.pop();
        });
        await network.dispatch(NetworkEventType.Undo);
    }
};

const searchSync = (
    network: Network,
    { assertStopSolving, onSolutionFound, onColumnChoice }: SearchOptions
) => {
    if (assertStopSolving()) return;
    if (network.isEmpty()) {
        // Current iteration is complete and a solution is found
        onSolutionFound(network.currentSolutionState);
    } else {
        // Find the next smallest column and cover it.
        // Try each node in the column as part of the solution.
        const column = network.reduce<Node>((acc, c) => {
            if (!acc) return c;
            return c.size < acc.size ? c : acc;
        })!;
        onColumnChoice(column);

        network.dispatchSync(NetworkEventType.Cover, column);
        column.forEach("down", (r) => {
            network.currentSolutionState.push(r);
            r.forEach("right", (j) =>
                network.dispatchSync(NetworkEventType.Cover, j.column)
            );
            searchSync(network, {
                assertStopSolving,
                onSolutionFound,

                onColumnChoice,
            });
            r.forEach("left", () =>
                network.dispatchSync(NetworkEventType.Undo)
            );
            network.currentSolutionState.pop();
        });
        network.dispatchSync(NetworkEventType.Undo);
    }
};
