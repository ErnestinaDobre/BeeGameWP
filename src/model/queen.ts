import { EntityType } from './entityTypes';
import { BaseEntity } from './baseEntity';

export class Queen extends BaseEntity {
    constructor() {
        super(100, EntityType.QUEEN);
    }

    takeDamage(): void {
        this.hp -= 8;
    }
}
