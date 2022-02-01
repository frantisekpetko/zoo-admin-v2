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
exports.Animal = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
const image_entity_1 = require("./image.entity");
const extlink_entity_1 = require("./extlink.entity");
let Animal = class Animal extends typeorm_3.BaseEntity {
};
__decorate([
    (0, typeorm_3.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Animal.prototype, "id", void 0);
__decorate([
    (0, typeorm_3.Column)(),
    __metadata("design:type", String)
], Animal.prototype, "name", void 0);
__decorate([
    (0, typeorm_3.Column)(),
    __metadata("design:type", String)
], Animal.prototype, "latinname", void 0);
__decorate([
    (0, typeorm_3.Column)(),
    __metadata("design:type", String)
], Animal.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => image_entity_1.Image, (image) => image.animal, {
        onDelete: 'CASCADE', onUpdate: 'RESTRICT', orphanedRowAction: 'delete'
    }),
    __metadata("design:type", Array)
], Animal.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => extlink_entity_1.Extlink, (extlink) => extlink.animal, {
        onDelete: 'CASCADE', onUpdate: 'RESTRICT', orphanedRowAction: 'delete'
    }),
    __metadata("design:type", Array)
], Animal.prototype, "extlinks", void 0);
__decorate([
    (0, typeorm_2.CreateDateColumn)(),
    __metadata("design:type", Date)
], Animal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Animal.prototype, "updatedAt", void 0);
Animal = __decorate([
    (0, typeorm_3.Entity)({ name: 'animal' })
], Animal);
exports.Animal = Animal;
//# sourceMappingURL=animal.entity.js.map