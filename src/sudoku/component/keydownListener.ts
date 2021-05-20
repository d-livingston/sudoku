import { Direction } from "../../types";

const createKeydownListener = (
    onNumberKey: (key: number) => void,
    onDeleteKey: () => void,
    onDirectionKey: (direction: Direction) => void,
    onNotesToggleKey: () => void
) => {
    return ({ key }: KeyboardEvent) => {
        switch (key) {
            case "1": {
            }
            case "2": {
            }
            case "3": {
            }
            case "4": {
            }
            case "5": {
            }
            case "6": {
            }
            case "7": {
            }
            case "8": {
            }
            case "9": {
                onNumberKey(parseInt(key));
                break;
            }
            case "Backspace": {
            }
            case "Delete": {
                onDeleteKey();
                break;
            }
            case "Left": {
            }
            case "ArrowLeft": {
            }
            case "a": {
                onDirectionKey("left");
                break;
            }
            case "Right": {
            }
            case "ArrowRight": {
            }
            case "d": {
                onDirectionKey("right");
                break;
            }
            case "Up": {
            }
            case "ArrowUp": {
            }
            case "w": {
                onDirectionKey("up");
                break;
            }
            case "Down": {
            }
            case "ArrowDown": {
            }
            case "s": {
                onDirectionKey("down");
                break;
            }
            case "n": {
                onNotesToggleKey();
                break;
            }
        }
    };
};

export default createKeydownListener;
