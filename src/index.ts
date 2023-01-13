import Board from "./classes/Board";
import Player from "./classes/Player";
import { BoardState } from "./types";

(() => {
    const stringState: string = "X|O|O|XOX";

    const state: BoardState = [
        ["X", null, "O"],
        [null, "O", null],
        [null, null, "X"]
    ];

    if (stringState.length !== 9) {
        console.log("board state string must be of length 9");
        return;
    };
    
    const board = new Board(stringState);
    
    const player = new Player(81);

    board.printBoardState();
    console.log("");

    let numberOfMoves = 0;

    board.state.forEach(row => row.forEach(val => {
        if (val === null) numberOfMoves++;
    }));
    
    for (let i = 0; i < numberOfMoves; i++) {
        const winner = board.isTerminal();
        if (winner) {
            console.log(`GAME OVER. WINNER IS ${winner}`);
            break;
        };

        console.log(i + 1);
        player.makeMove(board);
        board.printBoardState();
        i < numberOfMoves - 1 && console.log("");
    };
})();

