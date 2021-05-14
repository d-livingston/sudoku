import { Network } from "./network";
import Node from "../node";
import "./events";
import "./reduce";
import { NetworkSolution, NetworkEventType } from "./types";

declare module "./network" {
    interface Network {
        solve(): NetworkSolution;
    }
}

Network.prototype.solve = function (): NetworkSolution {
    let hasMultipleSolutions: boolean = false;
    let solution: Node[] = [];
    let columnsTried = 0,
        nodesTried = 0;

    const onSolutionFound = (sol: Node[]) => {
        if (solution.length === 0) {
            solution = [...sol];
        } else {
            hasMultipleSolutions = true;
        }
    };
    const assertStopSolving = () => hasMultipleSolutions;
    const onColumnChoice = () => columnsTried++;
    const onNodeChoice = () => nodesTried++;

    search(this, {
        onSolutionFound,
        assertStopSolving,
        onColumnChoice,
        onNodeChoice,
    });

    return {
        solution,
        hasMultipleSolutions,
        columnsTried,
        nodesTried,
    };
};

type SearchOptions = {
    assertStopSolving: () => boolean;
    onSolutionFound: (solution: Node[]) => void;
    onColumnChoice: (c: Node) => void;
    onNodeChoice: (n: Node) => void;
};

const search = (
    network: Network,
    {
        assertStopSolving,
        onSolutionFound,
        onColumnChoice,
        onNodeChoice,
    }: SearchOptions
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

        network.dispatch(NetworkEventType.Cover, column);
        column.forEach("down", (r) => {
            onNodeChoice(r);
            network.currentSolutionState.push(r);
            r.forEach("right", (j) =>
                network.dispatch(NetworkEventType.Cover, j.column)
            );
            search(network, {
                assertStopSolving,
                onSolutionFound,
                onNodeChoice,
                onColumnChoice,
            });
            r.forEach("left", () => network.dispatch(NetworkEventType.Undo));
            network.currentSolutionState.pop();
        });
        network.dispatch(NetworkEventType.Undo);
    }
};
