"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["Active"] = "Active";
    NotificationStatus["Deleted"] = "Deleted";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
(0, graphql_1.registerEnumType)(NotificationStatus, {
    name: 'NotificationStatus',
});
//# sourceMappingURL=notification.enum.js.map