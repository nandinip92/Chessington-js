import GameSettings from "../gameSettings";
import Player from "../player";
import Square from "../square";
import King from "./king";
import Piece from "./piece";

export default class Bishop extends Piece {
  constructor(player) {
    super(player);
  }

  getAvailableMoves(board) {
    const location = board.findPiece(this);
    const currentRow = location.row;
    const currentCol = location.col;
    const isValidMove = (row, col) => {
      return (
        row >= 0 &&
        row < GameSettings.BOARD_SIZE &&
        col >= 0 &&
        col < GameSettings.BOARD_SIZE
      );
    };
    let bishopMoves = [];
    const oppositePiece =
      this.player === Player.WHITE ? Player.BLACK : Player.WHITE;
    //Iterating diagonally towards top-right topRight: { row: +1, col: +1 }
    // Bishop pass through friendly pieces or opposing pieces
    // Bishop can take opposing pieces
    for (let i = 1; isValidMove(currentRow + i, currentCol + i); i++) {
      const newRow = currentRow + i;
      const newCol = currentCol + i;
      const newSquare = Square.at(newRow, newCol);
      const boardPiece = board.getPiece(newSquare);
      if (boardPiece === undefined) bishopMoves.push(newSquare);
      else {
        if (
          boardPiece.player === oppositePiece &&
          !(boardPiece instanceof King)
        )
          bishopMoves.push(newSquare);
        break;
      }
    }

    //Iterating diagonally towards top-left topRight: { row: +1, col: -1 }
    // Bishop pass through friendly pieces or opposing pieces
    // Bishop can take opposing pieces
    for (let i = 1; isValidMove(currentRow + i, currentCol - i); i++) {
      const newRow = currentRow + i;
      const newCol = currentCol - i;
      const newSquare = Square.at(newRow, newCol);
      const boardPiece = board.getPiece(newSquare);
      if (boardPiece === undefined) bishopMoves.push(newSquare);
      else {
        if (
          boardPiece.player === oppositePiece &&
          !(boardPiece instanceof King)
        )
          bishopMoves.push(newSquare);
        break;
      }
    }
    // Iterating diagonally towards top-left bottomRight: { row: -1, col: +1 }
    // Bishop pass through friendly pieces or opposing pieces
    // Bishop can take opposing pieces
    for (let i = 1; isValidMove(currentRow - i, currentCol + i); i++) {
      const newRow = currentRow - i;
      const newCol = currentCol + i;
      const newSquare = Square.at(newRow, newCol);
      const boardPiece = board.getPiece(newSquare);
      if (boardPiece === undefined) bishopMoves.push(newSquare);
      else {
        if (
          boardPiece.player === oppositePiece &&
          !(boardPiece instanceof King)
        )
          bishopMoves.push(newSquare);
        break;
      }
    }
    //Iterating diagonally towards top-left bottomRight: { row: -1, col: -1 }
    // Bishop pass through friendly pieces or opposing pieces
    // Bishop can take opposing pieces
    for (let i = 1; isValidMove(currentRow - i, currentCol - i); i++) {
      const newRow = currentRow - i;
      const newCol = currentCol - i;
      const newSquare = Square.at(newRow, newCol);
      const boardPiece = board.getPiece(newSquare);
      if (boardPiece === undefined) bishopMoves.push(newSquare);
      else {
        if (
          boardPiece.player === oppositePiece &&
          !(boardPiece instanceof King)
        )
          bishopMoves.push(newSquare);
        break;
      }
    }
    return bishopMoves;
  }
}
