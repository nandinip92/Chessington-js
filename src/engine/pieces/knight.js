import Piece from "./piece";
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Knight extends Piece {
  constructor(player) {
    super(player);
  }

  getAvailableMoves(board) {
    //return new Array(0);
    const location = board.findPiece(this);
    const possibleKnightMoves = {
      topRight: { row: 2, col: 1 }, // up 2 steps and right 1 step
      topLeft: { row: 2, col: -1 }, // up 2 steps and left 1 step
      bottomRight: { row: -2, col: 1 }, // down 2 steps and right 1 step
      bottomLeft: { row: -2, col: -1 }, // down 2 steps and left 1 step
      rightTop: { row: 1, col: 2 }, //  right 2 steps and up 1 step
      rightBottom: { row: -1, col: 2 }, // right  2 steps and down 1 step
      leftTop: { row: 1, col: -2 }, // left 2 steps and up 1 step
      leftBottom: { row: -1, col: -2 }, // left 2 steps and down 1 step
    };
    //Arrow function to check if the give Row and Column is on the Board
    const isValidMove = (row, col) => {
      return (
        row >= 0 &&
        row < GameSettings.BOARD_SIZE &&
        col >= 0 &&
        col < GameSettings.BOARD_SIZE
      );
    };

    //Following is the function used in Map to check if the move is valid or not
    //if it is valid it will return Square
    //else it will return undefined
    const getKnightMoves = (direction) => {
      const newRow = location.row + direction.row;
      const newCol = location.col + direction.col;
      const newSquare = Square.at(newRow, newCol);

      if (isValidMove(newRow, newCol)&& board.getPiece(newSquare)===undefined) {
        return newSquare;
      }
    };
    const validKnightMoves = Object.values(possibleKnightMoves)
      .map((direction) => getKnightMoves(direction))
      .filter((sp) => sp !== undefined);
    return validKnightMoves;
  }
}
