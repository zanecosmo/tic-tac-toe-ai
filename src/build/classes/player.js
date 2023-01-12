"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const Board_1 = __importDefault(require("./Board"));
class Player {
    constructor(maxDepth = -1) {
        this.getBestMoveNegamax = (board, color, depth) => {
            if (depth === 0)
                this.nodeMap.clear();
            const winner = board.isTerminal();
            if (winner || depth === this.maxDepth) {
                return winner === "DRAW" ? 0 : (100 - depth) * -color; // if color = -1, returned value should be positive
            }
            ;
            let best = Infinity * color; // if color = -1, best = -infinity
            console.log("AVAIABLE MOVES:");
            console.log(board.getAvailableMoves());
            board.getAvailableMoves().forEach((move, index) => {
                console.log(`DEPTH: ${depth}, INDEX: ${index}`);
                console.log(board.getAvailableMoves());
                console.log("CURRENT MOVE");
                console.log(move);
                const state = JSON.parse(JSON.stringify(board.state));
                // console.log("CURRENT BEST:")
                // console.log(best);
                const childBoard = new Board_1.default(state);
                childBoard.insert((Math.sign(color) === -1) ? types_1.Symbols.O : types_1.Symbols.X, move);
                const nodeValue = this.getBestMoveNegamax(childBoard, -color, (depth + 1));
                console.log("COLOR:");
                console.log(color);
                console.log(`MAX: ${best} vs ${nodeValue}`);
                // best = (Math.sign(color) === -1) ? Math.min(best, nodeValue) : Math.max(best, nodeValue);
                best = Math.max(best, nodeValue); // if color = -1, we want the bigger between -infinity and the nodeValue
                // best = nodeValue;
                if (depth === 0) {
                    const moves = this.nodeMap.has(nodeValue)
                        ? [...this.nodeMap.get(nodeValue), move]
                        : [move];
                    this.nodeMap.set(nodeValue, moves);
                }
                ;
            });
            console.log(`RETURNING BEST: ${best}`);
            return best;
        };
        this.getBestMove = (board, isMaximizing, depth) => {
            if (depth === 0)
                this.nodeMap.clear();
            const winner = board.isTerminal();
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
