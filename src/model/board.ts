import { EntityType } from './entityTypes';
import { EntityFactory } from './entityFactory';
import { Entity } from './entityInterfaces';

/**
 * Represents the game board containing bee entities.
 */
export class Board {
    /**
     * An array containing all bee entities on the board.
     */
    _allBees: Array<Entity> = new Array<Entity>();

    /**
     * Initializes the game board from a saved state.
     * @param {Array} boardJSON - The saved state of the game board.
     */
    initFromLoad(boardJSON: any[]) {
        for (let bee of boardJSON) {
            let beeOK: Entity = EntityFactory.createEntity(bee.entityType);
            beeOK.setHp(bee.hp);
            this._allBees.push(beeOK);
        }
    }

    /**
     * Initializes the game board with default bee entities.
     */
    initDefault() {
        this.addEntities(EntityType.QUEEN);
        this.addEntitiesOfType(EntityType.WORKER, 5);
        this.addEntitiesOfType(EntityType.DRONE, 8);
    }

    addEntities(...entityTypes: EntityType[]) {
        for (const et of entityTypes) {
            this.addEntity(et);
        }
    }

    /**
     * Adds a specified number of bee entities of a given type to the game board.
     * @param {EntityType} entityType - The type of bee entity to add.
     * @param {number} numberOfEntities - The number of entities to add.
     */
    addEntitiesOfType(entityType: EntityType, numberOfEntities: number) {
        for (let i = 0; i < numberOfEntities; i++) {
            this.addEntity(entityType);
        }
    }

    /**
     * Adds a bee entity of a specified type to the game board.
     * @param {EntityType} entityType - The type of bee entity to add.
     */
    addEntity(entityType: EntityType) {
        this._allBees.push(EntityFactory.createEntity(entityType));
    }

    /**
     * Adds a worker bee entity to the game board.
     */
    addWorkerBee() {
        this.addEntitiesOfType(EntityType.WORKER, 1);
    }

    /**
     * Adds a drone bee entity to the game board.
     */
    addDroneBee() {
        this.addEntitiesOfType(EntityType.DRONE, 1);
    }

    /**
     * Returns an array containing all bee entities on the board.
     * @returns {Array<Entity>} An array of bee entities on the board.
     */
    get allBees(): Array<Entity> {
        return this._allBees;
    }
}
