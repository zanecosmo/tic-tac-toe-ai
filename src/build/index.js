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
        ["X", null, "O"],
        [null, "O", null],
        [null, null, "X"]
    ];
    if (stringState.length !== 9) {
        console.log("board state string must be of length 9");
        return;
    }
    ;
    const board = new Board_1.default(stringState);
    const player = new Player_1.default(81);
    board.printBoardState();
    console.log("");
    let numberOfMoves = 0;
    board.state.forEach(row => row.forEach(val => {
        if (val === null)
            numberOfMoves++;
    }));
    for (let i = 0; i < numberOfMoves; i++) {
        const winner = board.isTerminal();
        if (winner) {
            console.log(`GAME OVER. WINNER IS ${winner}`);
            break;
        }
        ;
        console.log(i + 1);
        player.makeMove(board);
        board.printBoardState();
        i < numberOfMoves - 1 && console.log("");
    }
    ;
})();
