import Player from "../player";
import Square from "../square";
import Piece from "./piece";

export default class Pawn extends Piece {
  constructor(player) {
    super(player);
  }

  getAvailableMoves(board) {
    let location = board.findPiece(this);
    const currentRow = location.row;
    
    if (this.player === Player.WHITE) {
      //Pawn can move one or two spaces if it is their first move i.e., at the initial position
      // initial position for the Wite pawns is row=1
      if (currentRow === 1) {
        return [
          Square.at(currentRow + 1, location.col),
          Square.at(currentRow + 2, location.col),
        ];
      } else {
        return [Square.at(currentRow + 1, location.col)];
      }
    }
    if (this.player === Player.BLACK) {
        //Pawn can move one or two spaces if it is their first move i.e., at the initial position
      // initial position for the Black pawns is row=6
      if (currentRow === 6) {
        return [
          Square.at(currentRow - 1, location.col),
          Square.at(currentRow - 2, location.col),
        ];
      } else {
        return [Square.at(location.row - 1, location.col)];
      }
    }
  }
}

/* Initial Old Code */
    // if (this.player === Player.WHITE) {
    //     return Square.at(location.row + 1, location.col)
    // } else {
    //     return Square.at(location.row - 1, location.col)
    // }