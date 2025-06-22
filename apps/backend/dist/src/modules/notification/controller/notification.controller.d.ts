import { CreateNotificationInput } from '../model/create-notification.input';
import { UpdateNotificationInput } from '../model/update-notification.input';
import { NotificationService } from '../service/notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(body: CreateNotificationInput): Promise<import("nestjs-dynamoose").Item<import("../model/notification.model").Notification>>;
    update(id: string, body: UpdateNotificationInput): Promise<import("nestjs-dynamoose").Item<import("../model/notification.model").Notification>>;
    delete(id: string): Promise<void>;
    findOne(id: string): Promise<import("nestjs-dynamoose").Item<import("../model/notification.model").Notification>>;
    find({ userId, targetId }: {
        userId?: string;
        targetId?: string;
    }): Promise<import("nestjs-dynamoose").QueryResponse<import("nestjs-dynamoose").Item<import("../model/notification.model").Notification>>>;
}
