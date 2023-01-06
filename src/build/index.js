"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
const stringToBoard = (string) => {
    [...string].forEach((value, index) => {
        const row = Math.floor(index / 3);
        const column = index % 3;
        board[row][column] = value !== "|" ? value : null;
    });
};
const rotateBoard = (board) => {
    const newTop = [board[2][0], board[1][0], board[0][0]];
    const newLeft = [board[2][2], board[2][1], board[2][0]];
    const newBottom = [board[2][2], board[1][2], board[0][2]];
    const newRight = [board[0][0], board[0][1], board[0][2]];
    board = [
        [board[2][0], board[1][0], board[0][0]],
        [board[2][1], board[1][1], board[0][1]],
        [board[2][2], board[1][2], board[0][2]]
    ];
    return board;
};
stringToBoard("|O|||||||");
console.log(board);
const newBoard = rotateBoard(board);
console.log(newBoard);
console.log("----------");
stringToBoard("||||O||||");
console.log(board);
const newBoard2 = rotateBoard(board);
console.log(newBoard2);
console.log("----------");
stringToBoard("|||||||O|");
console.log(board);
const newBoard3 = rotateBoard(board);
console.log(newBoard3);
console.log("----------");
stringToBoard("|||O|||||");
console.log(board);
const newBoard4 = rotateBoard(board);
console.log(newBoard4);
console.log("----------");
const oppositeCorner = "OPPOSITE CONRER";
const oppositeEdge = "OPPOSITE EDGE";
const inBetweenCorner = "IN BETWEEN CORNER";
const closeCorner = "CLOSE CORNER";
const farCorner = "FAR CORNER";
const farEdge = "FAR EDGE";
const corner = "CORNER";
const edge = "EDGE";
const center = "CENTER";
const diagonalEdge = "DIAGONAL EDGE";
// they move first
// if they go center, go corner. they move, you block. then you go corner until its a cat's game;
// if they go corner, you go middle
//  if they go opposite corner, go far edge
//  if they go far edge, go in between corner corner
// if they go edge, you go middle
//  if they go close corner, block up till cat's
//  if they go diagonal edge OR far corner, go in between corner
//  if they go opposite edge, you go edge and they block up
//    you go yourside corner
// if cats game, go anywhere
// 
