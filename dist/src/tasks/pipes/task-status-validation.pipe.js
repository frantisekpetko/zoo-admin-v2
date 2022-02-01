"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusValidation = void 0;
const task_status_enum_1 = require("./../task-status.enum");
const common_1 = require("@nestjs/common");
class TaskStatusValidation {
    constructor() {
        this.allowedStatutes = [
            task_status_enum_1.TaskStatus.OPEN,
            task_status_enum_1.TaskStatus.IN_PROGRESS,
            task_status_enum_1.TaskStatus.DONE,
        ];
    }
    transform(value, { metatype }) {
        console.log('value', value);
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }
    isStatusValid(status) {
        const idx = this.allowedStatutes.indexOf(status);
        return idx !== -1;
    }
}
exports.TaskStatusValidation = TaskStatusValidation;
//# sourceMappingURL=task-status-validation.pipe.js.map