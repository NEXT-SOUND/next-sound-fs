"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationTestImports = void 0;
const nestjs_dynamoose_1 = require("nestjs-dynamoose");
const apollo_1 = require("@nestjs/apollo");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const notification_schema_1 = require("../schema/notification.schema");
exports.NotificationTestImports = [
    config_1.ConfigModule.forRoot(),
    graphql_1.GraphQLModule.forRoot({
        driver: apollo_1.ApolloDriver,
        autoSchemaFile: true,
    }),
    nestjs_dynamoose_1.DynamooseModule.forRoot({
        local: 'http://localhost:8001',
        aws: { region: 'local' },
        table: {
            create: false,
            prefix: `${process.env.SERVICE}-${process.env.STAGE}-`,
            suffix: '-table',
        },
    }),
    nestjs_dynamoose_1.DynamooseModule.forFeature([
        {
            name: 'notification',
            schema: notification_schema_1.NotificationSchema,
        },
    ]),
];
//# sourceMappingURL=notification-test.imports.js.map