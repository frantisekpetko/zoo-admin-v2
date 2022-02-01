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
exports.Choice = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
const story_entity_1 = require("./story.entity");
let Choice = class Choice extends typeorm_3.BaseEntity {
};
__decorate([
    (0, typeorm_3.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Choice.prototype, "id", void 0);
__decorate([
    (0, typeorm_3.Column)(),
    __metadata("design:type", String)
], Choice.prototype, "title", void 0);
__decorate([
    (0, typeorm_3.Column)(),
    __metadata("design:type", String)
], Choice.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => story_entity_1.Story, (story) => story.choices),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", story_entity_1.Story)
], Choice.prototype, "stories", void 0);
__decorate([
    (0, typeorm_2.CreateDateColumn)(),
    __metadata("design:type", Date)
], Choice.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Choice.prototype, "updatedAt", void 0);
Choice = __decorate([
    (0, typeorm_3.Entity)()
], Choice);
exports.Choice = Choice;
//# sourceMappingURL=choice.entity.js.map