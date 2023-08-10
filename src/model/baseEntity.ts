import { EntityType } from './entityTypes';
import { Entity } from './entityInterfaces';

/**
 * Represents the base entity class for bees.
 * @implements Entity
 */
export abstract class BaseEntity implements Entity {
    /**
     * The hit points (HP) of the bee entity.
     */
    hp: number;

    /**
     * The type of the bee entity.
     */
    entityType: EntityType;

    /**
     * Creates an instance of BaseEntity.
     * @param {number} hp - The initial hit points (HP) of the bee.
     * @param {EntityType} entityType - The type of the bee entity.
     */
    constructor(hp: number, entityType: EntityType) {
        this.hp = hp;
        this.entityType = entityType;
    }

    /**
     * Gets the type of the bee entity.
     * @returns {EntityType} The type of the bee entity.
     */
    getType(): EntityType {
        return this.entityType;
    }

    /**
     * Sets the hit points (HP) of the bee entity.
     * @param {number} hp - The new hit points (HP) value.
     */
    setHp(hp: number): void {
        this.hp = hp;
    }

    /**
     * Gets the current hit points (HP) of the bee entity.
     * @returns {number} The current hit points (HP) value.
     */
    getHp(): number {
        return this.hp;
    }

    /**
     * Abstract method for causing damage to the bee entity.
     */
    abstract takeDamage(): void;

    /**
     * Checks if the bee entity is alive based on its hit points (HP).
     * @returns {boolean} `true` if the bee entity is alive, otherwise `false`.
     */
    isAlive(): boolean {
        return this.hp > 0;
    }
}
