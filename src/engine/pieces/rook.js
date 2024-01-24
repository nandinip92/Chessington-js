import Square from "../square";
import Piece from "./piece";
import GameSettings from "../gameSettings";
import Player from "../player";
import King from "./king";

export default class Rook extends Piece {
  constructor(player) {
    super(player);
  }

  getAvailableMoves(board) {
    //return new Array(0);
    const location = board.findPiece(this);
    const currentRow = location.row;
    const currentCol = location.col;
    const opponentPiece =
      this.player === Player.WHITE ? Player.BLACK : Player.WHITE;

    //Rook Should not move through friendly pieces and opposite pieces
    
    const getForwardMoves = (direction) => {
      const forwardMoves = [];
      const currentPosition = direction === "V" ? currentRow : currentCol;
      for (let i = currentPosition + 1; i < GameSettings.BOARD_SIZE; i++) {
        const rookMove =
          direction === "V"
            ? Square.at(i, currentCol)
            : Square.at(currentRow, i);

        if (board.getPiece(rookMove) === undefined) forwardMoves.push(rookMove);
        else {
          const boardPiece = board.getPiece(rookMove);
          if (
            boardPiece.player === opponentPiece &&
            !(boardPiece instanceof King)
          )
            forwardMoves.push(rookMove);
          break;
        }
      }
      return forwardMoves;
    };

    const getBackwardMoves = (direction) => {
      const backwardMoves = [];
      const currentPosition = direction === "V" ? currentRow : currentCol;
      for (let i = currentPosition - 1; i >= 0; i--) {
        const rookMove =
          direction === "V"
            ? Square.at(i, currentCol)
            : Square.at(currentRow, i);
        if (board.getPiece(rookMove) === undefined)
          backwardMoves.push(rookMove);
        else {
          const boardPiece = board.getPiece(rookMove);
          if (
            boardPiece.player === opponentPiece &&
            !(boardPiece instanceof King)
          )
            backwardMoves.push(rookMove);
          break;
        }
      }
      return backwardMoves;
    };

    const verticalRookMoves = [
      ...getForwardMoves("V"),
      ...getBackwardMoves("V"),
    ];
    const horizontalRookMoves = [
      ...getForwardMoves("H"),
      ...getBackwardMoves("H"),
    ];

    const validMoves = [...verticalRookMoves, ...horizontalRookMoves];
    //console.log("--->verticalRookMoves", verticalRookMoves);
    return validMoves;
  }
}

/*Following is  Horizontal and Vertical Moves logic clearly with different for loops*/
//Rook Should not move through friendly pieces and opposite pieces
// let horizontalRookMoves = [],
//   verticalRookMoves = [];
// for (let i = currentRow + 1; i < GameSettings.BOARD_SIZE; i++) {
//   const rookMove = Square.at(i, location.col);
//   if (board.getPiece(rookMove) === undefined)
//     verticalRookMoves.push(rookMove);
//   else break;
// }
// for (let i = currentRow - 1; i >= 0; i--) {
//   const rookMove = Square.at(i, location.col);
//   if (board.getPiece(rookMove) === undefined)
//     verticalRookMoves.push(rookMove);
//   else break;
// }
// for (let i = currentCol + 1; i < GameSettings.BOARD_SIZE; i++) {
//   const rookMove = Square.at(location.row, i);
//   if (board.getPiece(rookMove) === undefined) horizontalRookMoves.push(rookMove);
//   else break;
// }
// for (let i = currentCol - 1; i >= 0; i--) {
//   const rookMove = Square.at(location.row, i);
//   if (board.getPiece(rookMove) === undefined) horizontalRookMoves.push(rookMove);
//   else break;
// }

//     const validMoves = [...verticalRookMoves, ...horizontalRookMoves];
//     //console.log("--->verticalRookMoves", verticalRookMoves);
//     return validMoves;
