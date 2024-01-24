import GameSettings from "../gameSettings";
import Player from "../player";
import Square from "../square";
import Piece from "./piece";

export default class Bishop extends Piece {
  constructor(player) {
    super(player);
  }

  getAvailableMoves(board) {
    //return new Array(0);
    const location = board.findPiece(this);
    const bishopDirections = {
      topRight: { row: 1, col: 1 },
      topLeft: { row: 1, col: -1 },
      bottomRight: { row: -1, col: 1 },
      bottomLeft: { row: -1, col: -1 },
    };
    const currentRow=location.row;
    const currentCol=location.col;
    const isValidMove=(row,col)=>{
        return row>=0&&row<GameSettings.BOARD_SIZE&&col>=0&&col<GameSettings.BOARD_SIZE;
    }
    let bishopMoves=[];
    //Iterating diagonally towards top-right topRight: { row: +1, col: +1 }
    for(let i =1;isValidMove(currentRow+i,currentCol+i);i++){
        const newRow = currentRow+i;
        const newCol = currentCol+i;
        const newSquare = Square.at(newRow,newCol);
        const boardPiece = board.getPiece(newSquare)
        if(boardPiece===undefined) bishopMoves.push(newSquare);
        else break;
    }
     //Iterating diagonally towards top-left topRight: { row: +1, col: -1 }
     for(let i =1;isValidMove(currentRow+i,currentCol-i);i++){
        const newRow = currentRow+i;
        const newCol = currentCol-i;
        const newSquare = Square.at(newRow,newCol);
        const boardPiece = board.getPiece(newSquare)
        if(boardPiece===undefined) bishopMoves.push(newSquare);
        else break;
    }
     //Iterating diagonally towards top-left bottomRight: { row: -1, col: +1 }
     for(let i =1;isValidMove(currentRow-i,currentCol+i);i++){
        const newRow = currentRow-i;
        const newCol = currentCol+i;
        const newSquare = Square.at(newRow,newCol);
        const boardPiece = board.getPiece(newSquare)
        if(boardPiece===undefined) bishopMoves.push(newSquare);
        else break;
    }
    //Iterating diagonally towards top-left bottomRight: { row: -1, col: -1 }
    for(let i =1;isValidMove(currentRow-i,currentCol-i);i++){
        const newRow = currentRow-i;
        const newCol = currentCol-i;
        const newSquare = Square.at(newRow,newCol);
        const boardPiece = board.getPiece(newSquare)
        if(boardPiece===undefined) bishopMoves.push(newSquare);
        else break;
    }
    return bishopMoves;
  }
}
