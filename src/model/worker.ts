import { EntityType } from './entityTypes';
import { BaseEntity } from './baseEntity';

export class Worker extends BaseEntity {
    constructor() {
        super(75, EntityType.WORKER);
    }

    takeDamage(): void {
        this.hp -= 10;
    }
}
