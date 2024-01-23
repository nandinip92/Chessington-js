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

    const currentRow = location.row;
    const currentCol = location.col
    let horizontalRookMoves=[],verticalRookMoves=[];
    for(let i = currentRow+1;i<GameSettings.BOARD_SIZE;i++){
      const rookMove = Square.at(i,location.col);
      if(board.getPiece(rookMove)===undefined) horizontalRookMoves.push(rookMove);
      else break;
    }
    for(let i= currentRow-1;i>=0;i--){
      const rookMove = Square.at(i,location.col);
      if(board.getPiece(rookMove)===undefined) horizontalRookMoves.push(rookMove);
      else break;
    }
    for(let i = currentCol+1;i<GameSettings.BOARD_SIZE;i++){
      const rookMove = Square.at(location.row,i);
      if(board.getPiece(rookMove)===undefined) horizontalRookMoves.push(rookMove);
      else break;
    }
    for(let i= currentCol-1;i>=0;i--){
      const rookMove = Square.at(location.row,i);
      if(board.getPiece(rookMove)===undefined) horizontalRookMoves.push(rookMove);
      else break;
    }
    // }
    //Rook Should not move through friendly pieces and opposint pieces
    //const validMoves = rookMoves.filter(loc=>board.getPiece(loc)!==undefined);
    const validMoves=[...horizontalRookMoves,...verticalRookMoves]
    //console.log("--->",validMoves)
    return validMoves;
  }
}
