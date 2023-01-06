import { Board, Row } from "./types";

const board: Board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

const stringToBoard = (string: string): void => {
    [...string].forEach((value, index) => {
        const row = Math.floor(index / 3);
        const column = index % 3;
        board[row][column] = value !== "|" ? value : null;
    });
};

const doValuesMatch = (a: string | null, b: string | null, c: string | null): boolean => {
    if (a === null || b === null || c === null) return false;
    return (a === b && a === c) ? true : false;
};

const threeInARow = (board: Board): boolean => {
    for (let i = 0; i < 3; i++) {
        if (doValuesMatch(board[i][0], board[i][1], board[i][2])) return true;
        if (doValuesMatch(board[0][i], board[1][i], board[2][i])) return true;
    };
    if (doValuesMatch(board[0][0], board[1][1], board[2][2])) return true;
    if (doValuesMatch(board[0][2], board[1][1], board[2][0])) return true;
    return false;
};

const gameIsOver = (board: Board) => {
    return true;
};

const evaluateBoard = (board: Board) => {
    return 1;
};

let currentPlayer = "";

const negamax = (board: Board, depth: number, color: number): number => {
    if (depth === 0 || gameIsOver(board)) return color * (evaluateBoard(board));

    let value: number = -Infinity;

    for (let row = 0; row < board.length; row++) {

        for (let column = 0; column < board[row].length; column++) {
            
            if (board[row][column] === null) board[row][column] = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            value = Math.max(value, -negamax(board, depth - 1, -color));
        };
    };
    
    return value;
}