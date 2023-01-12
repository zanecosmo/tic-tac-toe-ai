"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = __importDefault(require("./classes/Board"));
const Player_1 = __importDefault(require("./classes/Player"));
(() => {
    const stringState = "X|O|O|XOX";
    const state = [
        ["X", null, null],
        [null, "O", null],
        [null, null, "X"]
    ];
    if (stringState.length !== 9) {
        console.log("board state string must be of length 9");
        return;
    }
    ;
    const board = new Board_1.default(stringState);
    board.printBoardState();
    console.log("");
    // console.log(board.getAvailableMoves());
    // board.insert("O", { row: 2, column: 1 });
    // board.printBoardState();
    const player = new Player_1.default(81);
    console.log(player.getBestMove(board, true, 0));
    console.log(player.nodeMap);
})();
