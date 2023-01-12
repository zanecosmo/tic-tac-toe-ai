import { BoardState, Move, Symbols } from "../types";
import Board from "./Board";

interface Node {
    score: number;
    move: Move;
}

export default class Player {

    maxDepth: number;
    nodeMap: Map<number, Array<Move>>;

    constructor(maxDepth: number = -1) {
        this.maxDepth = maxDepth;
        this.nodeMap = new Map();
    };

    getBestMoveNegamax = (board: Board, color: number, depth: number): number => {
        if (depth === 0) this.nodeMap.clear();

        const winner = board.isTerminal();

        if (winner || depth === this.maxDepth) {
            return winner === "DRAW" ? 0 : (100 - depth) * -color; // if color = -1, returned value should be positive
        };

        let best: number = Infinity * color; // if color = -1, best = -infinity

        console.log("AVAIABLE MOVES:");
        console.log(board.getAvailableMoves());

        board.getAvailableMoves().forEach((move, index) => {
            console.log(`DEPTH: ${depth}, INDEX: ${index}`);
            console.log(board.getAvailableMoves());

            console.log("CURRENT MOVE");
            console.log(move);

            const state: BoardState = JSON.parse(JSON.stringify(board.state));
            // console.log("CURRENT BEST:")
            // console.log(best);

            const childBoard = new Board(state);
            childBoard.insert((Math.sign(color) === -1) ? Symbols.O : Symbols.X, move);
            const nodeValue = this.getBestMoveNegamax(childBoard, -color, (depth + 1));
            
            console.log("COLOR:");
            console.log(color);

            console.log(`MAX: ${best} vs ${nodeValue}`);
            // best = (Math.sign(color) === -1) ? Math.min(best, nodeValue) : Math.max(best, nodeValue);
            best = Math.max(best, nodeValue); // if color = -1, we want the bigger between -infinity and the nodeValue

            // best = nodeValue;

            if (depth === 0) {
                const moves: Array<Move> = this.nodeMap.has(nodeValue)
                    ? [...this.nodeMap.get(nodeValue)!, move]
                    : [move];
                this.nodeMap.set(nodeValue, moves);
            };
        });

        console.log(`RETURNING BEST: ${best}`);
        return best;
    };

    getBestMove = (board: Board, isMaximizing: boolean, depth: number): number => {
        if (depth === 0) this.nodeMap.clear();

        const winner = board.isTerminal();

        if (winner !== null || depth === this.maxDepth) {
            if (winner === Symbols.X) return 100 - depth;
            if (winner === Symbols.O) return -100 + depth;
            if (winner === "DRAW") return 0;
        };

        let best: number = isMaximizing ? -Infinity : Infinity;
        const symbol: Symbols = isMaximizing ? Symbols.X : Symbols.O;

        board.getAvailableMoves().forEach(move => {
            const state: BoardState = JSON.parse(JSON.stringify(board.state));

            const childBoard = new Board(state);
            childBoard.insert(symbol, move);
            const nodeValue = this.getBestMove(childBoard, !isMaximizing, depth + 1);

            best = isMaximizing ? Math.max(best, nodeValue) : Math.min(best, nodeValue);
        
            if (depth === 0) {
                const moves: Array<Move> = this.nodeMap.has(nodeValue)
                    ? [...this.nodeMap.get(nodeValue)!, move]
                    : [move];
                this.nodeMap.set(nodeValue, moves);
            };
        });

        return best;
    };
};