export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_RIGHT = "MOVE_RIGHT";
export const MOVE_UP = "MOVE_UP";
export const MOVE_DOWN = "MOVE_DOWN";

export function moveLeft() {
  return { type: MOVE_LEFT };
}

export function moveRight() {
  return { type: MOVE_RIGHT };
}

export function moveDown() {
  return { type: MOVE_DOWN };
}

export function moveUp() {
  return { type: MOVE_UP };
}
