"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformDateFilters = transformDateFilters;
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
function transformDateFilters(node, timezone) {
    var _a, _b;
    if (((_a = node.path) === null || _a === void 0 ? void 0 : _a[0]) === 'timestamp' && node.valueDate) {
        let date = dayjs_1.default.tz(node.valueDate, timezone);
        if (node.operator === 'LessThanEqual') {
            date = date.add(1, 'day');
        }
        const unixTime = date.unix();
        delete node.valueDate;
        node.valueNumber = unixTime;
    }
    if (node.operands && Array.isArray(node.operands)) {
        node.operands = node.operands.map((child) => transformDateFilters(child, timezone));
    }
    if (((_b = node.operands) === null || _b === void 0 ? void 0 : _b.length) === 0) {
        return undefined;
    }
    return node;
}
//# sourceMappingURL=utils.js.map