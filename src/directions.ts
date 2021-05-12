export type Direction = "left" | "right" | "up" | "down";

export function getOppositeDirection(direction: Direction): Direction {
    switch (direction) {
        case "down":
            return "up";
        case "up":
            return "down";
        case "left":
            return "right";
        case "right":
            return "left";
    }
}
