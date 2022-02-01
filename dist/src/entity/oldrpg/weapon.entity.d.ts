import { BaseEntity } from 'typeorm';
export declare class Weapon extends BaseEntity {
    id: number;
    name: string;
    attackModifier: number;
    damage: number;
    destruction: number;
    defenseModifier: number;
    speed: number;
    smallRange: number;
    mediumRange: number;
    bigRange: number;
    isFirearm: boolean;
    armor: number;
    blocking: number;
    isShield: boolean;
    equipmentSlots: number;
}
