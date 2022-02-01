import { BaseEntity } from 'typeorm';
export declare class Health extends BaseEntity {
    id: number;
    computeTotalValue(): void;
    totalValue: number;
    head: number;
    torso: number;
    leftHand: number;
    rightHand: number;
    leftLoof: number;
    rightLoof: number;
    leftLeg: number;
    rightLeg: number;
    leftFoot: number;
    rightFoot: number;
}
