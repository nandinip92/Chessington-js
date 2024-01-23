import Player from "../player";
import Square from "../square";
import King from "./king";
import Piece from "./piece";

export default class Pawn extends Piece {
  constructor(player) {
    super(player);
  }

  getAvailableMoves(board) {
    let location = board.findPiece(this);

    //Check if the pawns have reached their respective ends on the board
    // i.e, for Whites = 7 and for Blacks = 0
    if (
      (location.row === 7 && this.player === Player.WHITE) ||
      (location.row === 0 && this.player === Player.BLACK)
    )
      return [];

    let pawnMoveDirections;
    if (this.player === Player.WHITE) {
      pawnMoveDirections = {
        dright: { row: 1, col: 1 },
        dleft: { row: 1, col: -1 },
        front: { row: 1, col: 0 },
      };
    } else {
      pawnMoveDirections = {
        dright: { row: -1, col: 1 },
        dleft: { row: -1, col: -1 },
        front: { row: -1, col: 0 },
      };
    }
    const getMoveSquare = (direction) => {
      const newRow = location.row + direction.row;
      const newCol = location.col + direction.col;
      return [Square.at(newRow, newCol)];
    };
    // Pawn can move diagonally in two directions if it is between col 1-6
    // for col 0 it can only move to its diagonal right
    //for col 1 it can only move  to its diagonal left
    let diagonalMoves;
    if (location.col === 0)
      diagonalMoves = getMoveSquare(pawnMoveDirections.dright);
    else if (location === 7)
      diagonalMoves = getMoveSquare(pawnMoveDirections.dleft);
    else
      diagonalMoves = [
        ...getMoveSquare(pawnMoveDirections.dright),
        ...getMoveSquare(pawnMoveDirections.dleft),
      ];

    const opponentPeice =
      this.player === Player.WHITE ? Player.BLACK : Player.WHITE;
    const canMakeDiagonalMove = (loc) => {
      const peice = board.getPiece(loc);
      if (
        peice !== undefined &&
        peice.player == opponentPeice &&
        !(peice instanceof King)
      ) {
        return peice;
      }
    };
    const validDiagonalMoves = diagonalMoves.filter((loc) =>
      canMakeDiagonalMove(loc)
    );

    if (validDiagonalMoves.length !== 0) return validDiagonalMoves;

    const getTwoMoves = () => {
      let firstMove, secondMove;
      if (this.player === Player.WHITE) {
        firstMove = Square.at(location.row + 1, location.col);
        secondMove = Square.at(location.row + 2, location.col);
      } else {
        firstMove = Square.at(location.row - 1, location.col);
        secondMove = Square.at(location.row - 2, location.col);
      }
      //If the firstMove is allowed then only the pawn can move
      return board.getPiece(firstMove) !== undefined
        ? []
        : [firstMove, secondMove];
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
