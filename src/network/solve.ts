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

    const onSolutionFound = (sol: Node[]) => {
        if (solution.length === 0) {
            solution = [...sol];
        } else {
            hasMultipleSolutions = true;
        }
    };
    const assertStopSolving = () => hasMultipleSolutions;

    search(this, { onSolutionFound, assertStopSolving });

    return {
        solution,
        hasMultipleSolutions,
    };
};

type SearchOptions = {
    assertStopSolving: () => boolean;
    onSolutionFound: (solution: Node[]) => void;
};

const search = (
    network: Network,
    { assertStopSolving, onSolutionFound }: SearchOptions
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

        network.dispatch(NetworkEventType.Cover, column);
        column.forEach("down", (r) => {
            network.currentSolutionState.push(r);
            r.forEach("right", (j) =>
                network.dispatch(NetworkEventType.Cover, j.column)
            );
            search(network, { assertStopSolving, onSolutionFound });
            r.forEach("left", () => network.dispatch(NetworkEventType.Undo));
            network.currentSolutionState.pop();
        });
        network.dispatch(NetworkEventType.Undo);
    }
};
