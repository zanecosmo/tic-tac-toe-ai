import Board from "./classes/Board";
import Player from "./classes/Player";
import { BoardState } from "./types";

(() => {
    const stringState: string = "X|O|O|XOX";

    const state: BoardState = [
        ["X", null, null],
        [null, "O", null],
        [null, null, "X"]
    ];

    if (stringState.length !== 9) {
        console.log("board state string must be of length 9");
        return;
    };
    
    const board = new Board(stringState);
    
    board.printBoardState();
    console.log("");
    // console.log(board.getAvailableMoves());
    // board.insert("O", { row: 2, column: 1 });
    // board.printBoardState();

    const player = new Player(81);
    console.log(player.getBestMove(board, true, 0));
    console.log(player.nodeMap);
})();

