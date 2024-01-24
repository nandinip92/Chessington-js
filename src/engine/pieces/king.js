import Piece from "./piece";
import Square from "../square";
import GameSettings from "../gameSettings";

export default class King extends Piece {
  constructor(player) {
    super(player);
  }

  getAvailableMoves(board) {
    //return new Array(0);
    const location = board.findPiece(this);
    const possibleKingMoves = {
      top: { row: 1, col: 0 },
      bottom: { row: -1, col: 0 },
      right: { row: 0, col: 1 },
      left: { row: 0, col: -1 },
      topRight: { row: 1, col: 1 },
      topLeft: { row: 1, col: -1 },
      bottomRight: { row: -1, col: 1 },
      bottomLeft: { row: -1, col: -1 },
    };
    const isValidMove = (row, col) => {
      return (
        row >= 0 &&
        row < GameSettings.BOARD_SIZE &&
        col >= 0 &&
        col < GameSettings.BOARD_SIZE
      );
    };
    const getSquare = (direction) => {
      const newRow = location.row + direction.row;
      const newCol = location.col + direction.col;

      if (isValidMove(newRow, newCol)) {
        const newSquare = Square.at(newRow, newCol);
        return newSquare;
      }
    };
    const validKingMoves = Object.values(possibleKingMoves)
      .map((direction) => getSquare(direction))
      .filter((sq) => sq !== undefined);

    return validKingMoves;
  }
}
