import { EntityType } from './entityTypes';
import { Entity } from './entityInterfaces';
import { Drone } from './drone';
import { Queen } from './queen';
import { Worker } from './worker';

export class EntityFactory {
    static createEntity(entityType: EntityType): Entity {
        switch (entityType) {
            case EntityType.DRONE:
                return new Drone();
            case EntityType.QUEEN:
                return new Queen();
            case EntityType.WORKER:
                return new Worker();
            default:
                throw new Error('Unknown entity type');
        }
    }
}
