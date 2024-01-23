import Player from "../player";
import Square from "../square";
import Piece from "./piece";

export default class Pawn extends Piece {
  constructor(player) {
    super(player);
  }

  getAvailableMoves(board) {
    let location = board.findPiece(this);
    const getTwoMoves = () => {
      let firstMove,secondMove;
      if(this.player === Player.WHITE){
        firstMove = Square.at(location.row + 1, location.col);
        secondMove = Square.at(location.row + 2, location.col)
      }
      else{
        firstMove = Square.at(location.row - 1, location.col);
        secondMove =  Square.at(location.row - 2, location.col)
      }
      //If the firstMove is allowed then only the pawn can move
      return board.getPiece(firstMove)!==undefined?[]:[firstMove,secondMove]
    };
    const getOneMove = () => {
      return this.player === Player.WHITE
        ? [Square.at(location.row + 1, location.col)]
        : [Square.at(location.row - 1, location.col)];
    };

    //Pawn can move one or two spaces if it is their first move i.e., at the initial position
    // initial position for the Wite pawns is row=1
    // initial position for the Black pawns is row=6
    const pawnMoves =
      (location.row === 1 && this.player === Player.WHITE) ||
      (location.row === 6 && this.player === Player.BLACK)
        ? getTwoMoves()
        : getOneMove();
    //console.log("PawnMoves-->", pawnMoves);
    const availableMoves = pawnMoves.filter(
      (loc) => board.getPiece(loc) === undefined
    );
    //console.log("availableMoves--->", availableMoves);
    return availableMoves;
  }
}


/* Initial Old Code */

// if (this.player === Player.WHITE) {
//   //Pawn can move one or two spaces if it is their first move i.e., at the initial position
//   // initial position for the Wite pawns is row=1
//   return location.row === 1 ? getTwoMoves() : getOneMove();
// } else {
//   //Pawn can move one or two spaces if it is their first move i.e., at the initial position
//   // initial position for the Black pawns is row=6
//   return location.row === 6 ? getTwoMoves() : getOneMove();
// }
