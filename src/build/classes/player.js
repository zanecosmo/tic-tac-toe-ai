"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const Board_1 = __importDefault(require("./Board"));
class Player {
    constructor(maxDepth = -1) {
        this.determineSymbol = (board) => {
            if (board.isEmpty())
                return types_1.Symbols.X;
            let x = 0;
            let o = 0;
            board.state.forEach(row => row.forEach(val => {
                if (!val)
                    return;
                if (val === types_1.Symbols.X)
                    x++;
                else
                    o++;
            }));
            return x > o ? types_1.Symbols.O : types_1.Symbols.X;
        };
        this.makeMove = (board) => {
            const winner = board.isTerminal();
            if (winner)
                return console.log(`GAME IS OVER. THE WINNER IS: ${winner}`);
            const symbol = this.determineSymbol(board);
            const bestMoveValue = this.getBestMove(board, symbol === types_1.Symbols.X ? true : false, 0);
            const bestMoves = this.nodeMap.get(bestMoveValue);
            if (!bestMoves)
                return console.log("NO BEST MOVES. X DIDN'T START, GAME IS WON, OR ALGORITHM ISN'T WORKING");
            const move = bestMoves[0];
            board.insert(symbol, move);
        };
        this.getBestMove = (board, isMaximizing, depth) => {
            if (depth === 0)
                this.nodeMap.clear();
            const winner = board.isTerminal();
            // console.log(winner);
            if (winner !== null || depth === this.maxDepth) {
                if (winner === types_1.Symbols.X)
                    return 100 - depth;
                if (winner === types_1.Symbols.O)
                    return -100 + depth;
                if (winner === "DRAW")
                    return 0;
            }
            ;
            let best = isMaximizing ? -Infinity : Infinity;
            const symbol = isMaximizing ? types_1.Symbols.X : types_1.Symbols.O;
            board.getAvailableMoves().forEach(move => {
                const state = JSON.parse(JSON.stringify(board.state));
                const childBoard = new Board_1.default(state);
                childBoard.insert(symbol, move);
                const nodeValue = this.getBestMove(childBoard, !isMaximizing, depth + 1);
                best = isMaximizing ? Math.max(best, nodeValue) : Math.min(best, nodeValue);
                if (depth === 0) {
                    const moves = this.nodeMap.has(nodeValue)
                        ? [...this.nodeMap.get(nodeValue), move]
                        : [move];
                    this.nodeMap.set(nodeValue, moves);
                }
                ;
            });
            return best;
        };
        this.maxDepth = maxDepth;
        this.nodeMap = new Map();
    }
    ;
}
exports.default = Player;
;
