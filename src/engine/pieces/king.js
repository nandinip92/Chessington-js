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

    //Following is the function used in Map to check if the move is valid or not
    //if it is valid it will return Square 
    //else it will return undefined
    const getSquare = (direction) => {
      const newRow = location.row + direction.row;
      const newCol = location.col + direction.col;

      if (isValidMove(newRow, newCol)) {
        const newSquare = Square.at(newRow, newCol);
        return newSquare;
      }
    };

    //Checking if the King can move in all the possible directions
    const validKingMoves = Object.values(possibleKingMoves)
      .map((direction) => getSquare(direction))
      .filter((sq) => sq !== undefined);    //filtering out all the undefined values

    return validKingMoves;
  }
}
