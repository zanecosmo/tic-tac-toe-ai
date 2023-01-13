import { BoardState, Move, Symbols } from "../types";
import Board from "./Board";

export default class Player {

    maxDepth: number;
    nodeMap: Map<number, Array<Move>>;

    constructor(maxDepth: number = -1) {
        this.maxDepth = maxDepth;
        this.nodeMap = new Map();
    };

    determineSymbol = (board: Board): Symbols => {
        if (board.isEmpty()) return Symbols.X;

        let x = 0;
        let o = 0;

        board.state.forEach(row => row.forEach(val => {
            if (!val) return;
            if (val === Symbols.X) x++;
            else o++;
        }));

        return x > o ? Symbols.O : Symbols.X;
    };

    makeMove = (board: Board): void => {
        const winner = board.isTerminal();
        if (winner) return console.log(`GAME IS OVER. THE WINNER IS: ${winner}`);

        const symbol: Symbols = this.determineSymbol(board);
        const bestMoveValue: number = this.getBestMove(board, symbol === Symbols.X ? true : false, 0);
        const bestMoves: Array<Move> | undefined = this.nodeMap.get(bestMoveValue);

        if (!bestMoves) return console.log("NO BEST MOVES. X DIDN'T START OR ALGORITHM ISN'T WORKING");
        const move = bestMoves[0];

        board.insert(symbol, move);
    };

    getBestMove = (board: Board, isMaximizing: boolean, depth: number): number => {
        if (depth === 0) this.nodeMap.clear();

        const winner = board.isTerminal();
        // console.log(winner);

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