import { BaseEntity } from 'typeorm';
export declare class Character extends BaseEntity {
    id: number;
    name: string;
    levelpower: number;
    computeLevelpower(): void;
    race: string;
    strength: number;
    dexterity: number;
    knack: number;
    constitution: number;
    intelligence: number;
    perception: number;
    will: number;
    charisma: number;
    bodySize: string;
    hit: number;
    damage: number;
    destruction: number;
    defense: number;
    speed: number;
    movement: number;
    gold: number;
    silver: number;
    cooper: number;
}
