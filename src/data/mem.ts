import { Board } from "../model/board";
import { Entity } from "../model/entityInterfaces";
import { EntityType } from '../model/entityTypes';

/**
 * Represents the game memory and its state.
 */
export class GameMem {
    board: Board;

    /**
     * Sets the game board.
     * @param {Board} board - The game board.
     */
    setBoard(board: Board): void {
        this.board = board;
    }

    /**
     * Gets the game board.
     * @returns {Board} The game board.
     */
    getBoard(): Board {
        return this.board;
    }

    /**
     * Checks if the game is over (Queen is dead or all the other bees are dead).
     * @returns {boolean} Whether the game is over or not.
     */
    isGameOver(): boolean {
        
        const queenBee = this.board.allBees.filter((bee: Entity) => bee.getType() === EntityType.QUEEN);
        const restOfBees = this.board.allBees.find((bee: Entity) => bee.getType() !== EntityType.QUEEN && bee.getType() !== undefined);
        console.log(queenBee)
        
        if ((queenBee && queenBee.some(queen => queen.getHp() <= 0)) || !restOfBees.isAlive()) {
            return true;
        }

 

        return false;
    }

    /**
     * Saves the current game state to local storage.
     */
    saveGame(): void {
        if (this.board.allBees.some((bee: Entity) => bee.isAlive())) {
            localStorage.setItem('GAME_STATE', JSON.stringify(this.board));
        }
    }

    /**
     * Loads the game state from local storage.
     */
    loadGame(): void {
        const savedBoard = JSON.parse(localStorage.getItem('GAME_STATE'));
        this.board = new Board();
        this.board.initFromLoad(savedBoard._allBees);

        console.log('LOADED GAME:', this.board);
    }

    /**
     * Resets the game state.
     */
    resetGame(): void {
        localStorage.removeItem('GAME_STATE');

        this.board = new Board();
        this.board.initDefault();
        localStorage.setItem('GAME_STATE', JSON.stringify(this.board));
    }
}
