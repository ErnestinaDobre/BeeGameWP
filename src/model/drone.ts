import { EntityType } from './entityTypes';
import { BaseEntity } from './baseEntity';

export class Drone extends BaseEntity {
    constructor() {
        super(50, EntityType.DRONE);
    }

    takeDamage(): void {
        this.hp -= 12;
    }
}
