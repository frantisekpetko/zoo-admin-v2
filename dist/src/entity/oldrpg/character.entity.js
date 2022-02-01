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
exports.Character = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
let Character = class Character extends typeorm_2.BaseEntity {
    computeLevelpower() {
    }
};
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Character.prototype, "id", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", String)
], Character.prototype, "name", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "levelpower", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Character.prototype, "computeLevelpower", null);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", String)
], Character.prototype, "race", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "strength", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "dexterity", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "knack", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "constitution", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "intelligence", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "perception", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "will", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "charisma", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", String)
], Character.prototype, "bodySize", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "hit", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "damage", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "destruction", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "defense", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "speed", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "movement", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "gold", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "silver", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Character.prototype, "cooper", void 0);
Character = __decorate([
    (0, typeorm_2.Entity)({ name: 'character' })
], Character);
exports.Character = Character;
//# sourceMappingURL=character.entity.js.map