import Square from "../square";
import Piece from "./piece";
import GameSettings from "../gameSettings";

export default class Rook extends Piece {
  constructor(player) {
    super(player);
  }

  getAvailableMoves(board) {
    //return new Array(0);
    const location = board.findPiece(this);
    let rookMoves = [];

    for (let i = 0; i < GameSettings.BOARD_SIZE; i++) {
      //Get Horizontal Moves
      if (i !== location.col) {
        rookMoves.push(Square.at(location.row, i));
      }
      //Get Vertical Moves
      if (i !== location.row) {
        rookMoves.push(Square.at(i, location.col));
      }
    }

    return rookMoves;
  }
}
