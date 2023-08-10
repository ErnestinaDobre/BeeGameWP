import { GameMem } from "./data/mem";
import { Board } from "./model/board";
import { UI } from "./ui/ui";
import { handleHitButtonClick } from "./eventhandlers/hitButtonEventHandler";
import { handleResetButtonClick } from "./eventhandlers/resetButtonEventHandler"
import { handleAddBeeButtonClick } from "./eventhandlers/addBeeButtonEventHandler"
import { handleNameInput } from "./eventhandlers/inputPlayersNameEventHandler";

// Initialize the game
let game: GameMem;

if (localStorage.getItem('GAME_STATE')) {
    game = new GameMem();
    game.loadGame();
} else {
    game = new GameMem();
    const board: Board = new Board();
    board.initDefault();
    game.setBoard(board);
}

const uiGraphics: UI = new UI(game);
uiGraphics.refreshBoard();

// Initialize event handlers
handleHitButtonClick(game, uiGraphics);
handleResetButtonClick(game, uiGraphics);
handleAddBeeButtonClick(game, uiGraphics, 'drone');
handleAddBeeButtonClick(game, uiGraphics, 'worker');

// Input player's name
const nameInput = document.getElementById('nameInput') as HTMLInputElement;
const editButton = document.getElementById('editButton') as HTMLButtonElement;
const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
const outputDiv = document.getElementById('output') as HTMLDivElement;

handleNameInput(nameInput, editButton, submitButton, outputDiv);
