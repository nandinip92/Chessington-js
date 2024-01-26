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
    /*Following is  Horizontal and Vertical Moves logic clearly with different for loops*/
    //Rook Should not move through friendly pieces and opposite pieces
    let horizontalRookMoves = [],
      verticalRookMoves = [];
    for (let i = currentRow + 1; i < GameSettings.BOARD_SIZE; i++) {
      const rookMove = Square.at(i, location.col);
      const boardPiece = board.getPiece(rookMove);

      if (board.getPiece(rookMove) === undefined)
        verticalRookMoves.push(rookMove);
      else break;
    }
    for (let i = currentRow - 1; i >= 0; i--) {
      const rookMove = Square.at(i, location.col);
      const boardPiece = board.getPiece(rookMove);
      if (boardPiece === undefined) verticalRookMoves.push(rookMove);
      else {
        if (
          boardPiece.player === opponentPiece &&
          !(boardPiece instanceof King)
        )
          verticalRookMoves.push(rookMove);
        break;
      }
    }
    for (let i = currentCol + 1; i < GameSettings.BOARD_SIZE; i++) {
      const rookMove = Square.at(location.row, i);
      const boardPiece = board.getPiece(rookMove);

      if (boardPiece === undefined) horizontalRookMoves.push(rookMove);
      else {
        if (
          boardPiece.player === opponentPiece &&
          !(boardPiece instanceof King)
        )
          horizontalRookMoves.push(rookMove);
        break;
      }
    }
    for (let i = currentCol - 1; i >= 0; i--) {
      const rookMove = Square.at(location.row, i);
      const boardPiece = board.getPiece(rookMove);

      if (boardPiece === undefined) horizontalRookMoves.push(rookMove);
      else {
        if (
          boardPiece.player === opponentPiece &&
          !(boardPiece instanceof King)
        )
          horizontalRookMoves.push(rookMove);
        break;
      }
    }

    const validMoves = [...verticalRookMoves, ...horizontalRookMoves];
    //console.log("--->verticalRookMoves", verticalRookMoves);
    return validMoves;
  }
}
