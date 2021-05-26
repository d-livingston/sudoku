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
import Sudoku from "@d-livingston/sudoku";
```

## Usage

There are three main usages of this Sudoku package: generating Sudoku puzzles, solving Sudoku puzzles, and using the React component for a Sudoku puzzle.

### Generating Sudoku Puzzles

The generator can be used to create a 9x9 Sudoku puzzle randomly and has both a synchronous and an asynchronous option.

```javascript
// Synchronous
const generated = Sudoku.generateSync();

// Asynchronous
const generated = await Sudoku.generate();

// OR
Sudoku.generate().then((generated) => /* ... */ );
```

The result of the generate method is an object containing the Sudoku puzzle, its solution, and an approximation of the difficulty of the puzzle. For example, the output may look like:

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

    difficulty: "easy"
}
```

### Solving Sudoku Puzzles

The solver can be used to solve any valid Sudoku puzzle. It also features a synchronous and an asynchronous option.

```javascript
// Synchronous
const solution = Sudoku.solveSync(sudoku);

// Asynchronous
const solution = await Sudoku.solve(sudoku);

// OR
Sudoku.solve(sudoku).then((solution) => /* ... */ );
```

The resultant solution is an object with the solution of the Sudoku puzzle and a flag determining whether the puzzle has multiple solutions. For example, the output may look the following:

```bash
{
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

    hasMultipleSolutions: false
}
```

### React Component

The React component handles everything for you. All you have to provide is the initial Sudoku puzzle. This can be combined with the generate function to create a React component with a random puzzle:

```jsx
const { sudoku } = Sudoku.generateSync();

React.render(
    <Sudoku.Component sudoku={sudoku} />,
    document.getElementById("root")
);
```

The component looks like the following:

<img src="https://user-images.githubusercontent.com/77318409/119594959-97d29500-bd91-11eb-8689-0d093a1fcc52.png" alt="Example Sudoku puzzle">
