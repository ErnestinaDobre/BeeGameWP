import { EntityType } from './entityTypes';

export interface Entity {
    getType(): EntityType;
    takeDamage(): void;
    isAlive(): boolean;
    getHp(): number;
    setHp(hp: number): void;
}