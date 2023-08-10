import { GameMem } from "../data/mem";
import { Entity } from "../model/entityInterfaces";
import { EntityType } from '../model/entityTypes';

/**
 * Represents the user interface for displaying bee information.
 */
export class BeeUI {
    private bee: Entity;
    private ui: UI;

    /**
     * Creates an instance of BeeUI.
     * @param {Entity} bee - The bee entity.
     * @param {UI} ui - The user interface.
     */
    constructor(bee: Entity, ui: UI) {
        this.bee = bee;
        this.ui = ui;
    }

    /**
     * Generates the HTML element for displaying bee information.
     * @returns {HTMLElement} The HTML element representing the bee.
     */
    display(): HTMLElement {
        const result = document.createElement('div');
        const h2Header = document.createElement('h2');
        let btype = '';

        switch (this.bee.getType()) {
            case EntityType.DRONE:
                btype = 'DRONE';
                h2Header.innerHTML = `<img class="droneimg" src="drone.png" alt="Drone">`;
                break;
            case EntityType.QUEEN:
                btype = 'QUEEN';
                h2Header.innerHTML = `<img class="queenimg" src="queen.png" alt="Queen">`;
                break;
            case EntityType.WORKER:
                btype = 'WORKER';
                h2Header.innerHTML = `<img class="workerimg" src="worker.png" alt="Worker">`;
                break;
            default:
                throw new Error('Unknown Entity Type');
        }

        result.appendChild(h2Header);
        result.className = btype.toLowerCase();

        if (this.bee.isAlive()) {
            const hpIndicator = document.createElement('span');
            hpIndicator.innerHTML = 'HP: ' + this.bee.getHp();
            result.appendChild(hpIndicator);
        } else {
            const beeStatus = document.createElement('p');
            beeStatus.innerHTML = `<img class="dead" src="dead.png" alt="dead"><p>DEAD</p>`;
            result.innerHTML = '';
            result.appendChild(beeStatus);
        }

        return result;
    }
}

/**
 * Represents the main user interface for the game.
 */
export class UI {
    gameMem: GameMem;

    /**
     * Creates an instance of UI.
     * @param {GameMem} gameMem - The game memory.
     */
    constructor(gameMem: GameMem) {
        this.gameMem = gameMem;
    }

    /**
     * Generates the UI elements for the game board.
     * @returns {Array<HTMLElement>} An array of HTML elements representing bees.
     */
    private generateBoardUI(): Array<HTMLElement> {
        const elements: Array<HTMLElement> = [];

        for (const bee of this.gameMem.getBoard().allBees) {
            const beeUI = new BeeUI(bee, this);
            elements.push(beeUI.display());
        }

        return elements;
    }

    /**
     * Updates the total HP display in the UI.
     * @param {number} totalHp - The total HP value.
     */
    private updateTotalHpDisplay(totalHp: number) {
        const totalHpDisplay = document.getElementById('hivehealth');
        if (totalHpDisplay) {
            totalHpDisplay.textContent = `Total hive HP: ${totalHp}`;
        }
    }

    /**
     * Refreshes the game board UI.
     */
    refreshBoard() {
        const drone = document.getElementById('drone');
        const worker = document.getElementById('worker');
        const queen = document.getElementById('queen');
        
        // Clear the containers before adding new elements
        drone.innerHTML = '';
        worker.innerHTML = '';
        queen.innerHTML = '';

        // Generate and display UI elements for bees
        const boardUI = this.generateBoardUI();

        boardUI.forEach(beeUI => {
            if (beeUI.className === 'worker') {
                worker.appendChild(beeUI);
            } else if (beeUI.className === 'drone') {
                drone.appendChild(beeUI);
            } else {
                queen.appendChild(beeUI);
            }
        });

        // Save game state and update total HP display
        if (this.gameMem.board.allBees.length) {
            this.gameMem.saveGame();
        }

        const totalHp = this.gameMem.board.allBees
            .filter((bee: Entity) => bee.isAlive())
            .reduce((acc: number, entity: Entity) => {
                return acc + entity.getHp();
            }, 0);

        this.updateTotalHpDisplay(totalHp);
    }
}
