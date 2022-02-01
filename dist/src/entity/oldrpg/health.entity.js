"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Health = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
let Health = class Health extends typeorm_2.BaseEntity {
    computeTotalValue() {
        this.totalValue = 0;
        this.totalValue = +this.head;
        this.totalValue = +this.torso;
        this.totalValue = +this.leftHand;
        this.totalValue = +this.rightHand;
        this.totalValue = +this.leftLoof;
        this.totalValue = +this.rightLoof;
        this.totalValue = +this.leftLeg;
        this.totalValue = +this.rightLeg;
        this.totalValue = +this.leftFoot;
        this.totalValue = +this.rightFoot;
    }
};
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Health.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Health.prototype, "computeTotalValue", null);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Health.prototype, "totalValue", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Health.prototype, "head", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Health.prototype, "torso", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Health.prototype, "leftHand", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Health.prototype, "rightHand", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Health.prototype, "leftLoof", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Health.prototype, "rightLoof", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Health.prototype, "leftLeg", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Health.prototype, "rightLeg", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Health.prototype, "leftFoot", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Health.prototype, "rightFoot", void 0);
Health = __decorate([
    (0, typeorm_2.Entity)({ name: 'health' })
], Health);
exports.Health = Health;
//# sourceMappingURL=health.entity.js.map