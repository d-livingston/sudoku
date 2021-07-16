# Sudoku

A basic Sudoku package. Provides functions for generating, solving, and displaying Sudoku puzzles using React components.

## Table of Contents

-   [Installation](#installation)
-   [Importing the Package](#importing-the-package)
-   [Usage](#usage)
    -   [Generating Sudoku Puzzles](#generating-sudoku-puzzles)
    -   [Solving Sudoku Puzzles](#solving-sudoku-puzzles)
    -   [React Component](#react-component)

## Installation

Install Sudoku using [`npm`](https://www.npmjs.com/package/@d-livingston/sudoku):

```bash
npm install @d-livingston/sudoku
```

## Importing the Package

```javascript
import { generate, solve, Component } from "@d-livingston/sudoku";
```

## Usage

There are three main usages of this Sudoku package: generating Sudoku puzzles, solving Sudoku puzzles, and using the React component for a Sudoku puzzle.

### Generating Sudoku Puzzles

The generator can be used to create a 9x9 Sudoku puzzle randomly.

```javascript
import { generate } from "@d-livingston/sudoku";

generate();

// OR
Sudoku.generate({ verbose: true });
```

The result of generate without verbose being set is a two-dimensional array containing the Sudoku puzzle. With it being set, the result is an object containing the puzzle and its solution, like below:

```bash
{
    sudoku: [
        [9, 0, 7, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 3, 0, 0, 8, 9],
        [0, 0, 0, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 3, 0, 0],
        [0, 0, 0, 0, 0, 5, 0, 0, 0],
        [0, 0, 4, 3, 0, 0, 5, 2, 8],
        [1, 0, 8, 0, 6, 0, 7, 0, 0],
        [7, 0, 6, 0, 5, 3, 0, 4, 0],
        [5, 0, 0, 0, 0, 0, 6, 3, 0],
    ],

    solution: [
        [9, 8, 7, 4, 2, 6, 1, 5, 3],
        [2, 6, 5, 1, 3, 7, 4, 8, 9],
        [4, 1, 3, 5, 8, 9, 2, 6, 7],
        [8, 5, 1, 6, 9, 2, 3, 7, 4],
        [3, 7, 2, 8, 4, 5, 9, 1, 6],
        [6, 9, 4, 3, 7, 1, 5, 2, 8],
        [1, 3, 8, 2, 6, 4, 7, 9, 5],
        [7, 2, 6, 9, 5, 3, 8, 4, 1],
        [5, 4, 9, 7, 1, 8, 6, 3, 2],
    ],
}
```

### Solving Sudoku Puzzles

The solver can be used to solve any valid Sudoku puzzle.

```javascript
import { solve } from "@d-livingston/sudoku";

solve(sudoku);
```

The result is the completed Sudoku puzzle.

### React Component

The React component handles everything for you. All you have to provide is the initial Sudoku puzzle. This can be combined with the generate function to create a React component with a random puzzle:

```jsx
import { generate, Component } from "@d-livingston/sudoku";

React.render(
    <Component sudoku={generate()} />,
    document.getElementById("root")
);
```

The component looks like the following:

<img src="https://user-images.githubusercontent.com/77318409/119594959-97d29500-bd91-11eb-8689-0d093a1fcc52.png" alt="Example Sudoku puzzle">
