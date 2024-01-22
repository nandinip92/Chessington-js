import Player from "../player";
import Square from "../square";
import Piece from "./piece";

export default class Pawn extends Piece {
  constructor(player) {
    super(player);
  }

  getAvailableMoves(board) {
    let location = board.findPiece(this);
    const getTwoMoves = (player) => {
      return player === "white"
        ? [
            Square.at(location.row + 1, location.col),
            Square.at(location.row + 2, location.col),
          ]
        : [
            Square.at(location.row - 1, location.col),
            Square.at(location.row - 2, location.col),
          ];
    };
    const getOneMove = (player) => {
      return player === "white"
        ? [Square.at(location.row + 1, location.col)]
        : [Square.at(location.row - 1, location.col)];
    };
    if (this.player === Player.WHITE) {
      //Pawn can move one or two spaces if it is their first move i.e., at the initial position
      // initial position for the Wite pawns is row=1
      return location.row === 1 ? getTwoMoves("white") : getOneMove("white");
    } else {
      //Pawn can move one or two spaces if it is their first move i.e., at the initial position
      // initial position for the Black pawns is row=6
      return location.row === 6 ? getTwoMoves("black") : getOneMove("black");
    }
  }
}

/* Initial Old Code */
// if (this.player === Player.WHITE) {
//     return Square.at(location.row + 1, location.col)
// } else {
//     return Square.at(location.row - 1, location.col)
// }
