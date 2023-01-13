"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
class Board {
    constructor(state) {
        this.stringToBoard = (string) => {
            const state = [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ];
            [...string].forEach((value, index) => {
                const row = Math.floor(index / 3);
                const column = index % 3;
                state[row][column] = value !== "|" ? value : null;
            });
            return state;
        };
        this.boardToString = () => {
            let stateString = "";
            this.state.forEach(row => {
                row.forEach(val => {
                    if (val === null) {
                        stateString = stateString.concat("|");
                        return;
                    }
                    ;
                    if (val === types_1.Symbols.X) {
                        stateString = stateString.concat(`${types_1.Symbols.X}`);
                        return;
                    }
                    ;
                    stateString = stateString.concat(`${types_1.Symbols.O}`);
                });
            });
            return stateString;
        };
        this.printBoardState = () => {
            let board = "";
            const divider = "\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015";
            this.state.forEach((row, i) => {
                row.forEach((val, j) => {
                    if (j === 2) {
                        board = board.concat(` ${val === null ? " " : `${val}`} `);
                        if (i !== 2)
                            board = board.concat("\n", divider, "\n");
                    }
                    else
                        board = board.concat(` ${val === null ? " " : `${val}`} |`);
                });
            });
            console.log(board);
        };
        this.isEmpty = () => {
            for (let row = 0; row < this.state.length; row++) {
                for (let col = 0; col < this.state[row].length; col++) {
                    if (this.state[row][col] !== null)
                        return false;
                }
                ;
            }
            ;
            return true;
        };
        this.isFull = () => {
            for (let row = 0; row < this.state.length; row++) {
                for (let col = 0; col < this.state[row].length; col++) {
                    if (this.state[row][col] === null)
                        return false;
                }
                ;
            }
            ;
            return true;
        };
        this.doValuesMatch = (a, b, c) => {
            if (a === null || b === null || c === null)
                return false;
            return (a === b && a === c) ? true : false;
        };
        this.isTerminal = () => {
            if (this.isEmpty())
                return null;
            for (let i = 0; i < 3; i++) {
                if (this.doValuesMatch(this.state[i][0], this.state[i][1], this.state[i][2])) {
                    return this.state[i][0];
                }
                ;
                if (this.doValuesMatch(this.state[0][i], this.state[1][i], this.state[2][i])) {
                    return this.state[0][i];
                }
                ;
            }
            ;
            if (this.doValuesMatch(this.state[0][0], this.state[1][1], this.state[2][2])) {
                return this.state[0][0];
            }
            ;
            if (this.doValuesMatch(this.state[0][2], this.state[1][1], this.state[2][0])) {
                return this.state[1][1];
            }
            ;
            return this.isFull() ? "DRAW" : null;
        };
        this.insert = (symbol, move) => {
            if (symbol !== types_1.Symbols.X && symbol !== types_1.Symbols.O)
                throw new Error("symbol must be 'X' or 'O'");
            const { row, column } = move;
            if (row > 2 || column > 2)
                throw new Error("position out of bounds");
            if (this.state[row][column])
                return false;
            this.state[row][column] = symbol;
            return true;
        };
        this.getAvailableMoves = () => {
            const moves = [];
            this.state.forEach((row, i) => {
                row.forEach((val, j) => {
                    if (val === null)
                        moves.push({ row: i, column: j });
                });
            });
            return moves;
        };
        if (!state) {
            this.state = [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ];
            return;
        }
        ;
        if (typeof state === "string") {
            if (state.length === 9)
                this.state = this.stringToBoard(state);
            else
                throw new Error("board-state must be a string of length 9");
            return;
        }
        ;
        this.state = [...state];
    }
    ;
}
exports.default = Board;
;
