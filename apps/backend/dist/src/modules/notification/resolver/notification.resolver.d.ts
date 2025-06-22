import { CreateNotificationInput } from '../model/create-notification.input';
import { Notification } from '../model/notification.model';
import { UpdateNotificationInput } from '../model/update-notification.input';
import { NotificationService } from '../service/notification.service';
export declare class NotificationResolver {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    createNotification(input: CreateNotificationInput): Promise<import("nestjs-dynamoose").Item<Notification>>;
    updateNotification(id: string, input: UpdateNotificationInput): Promise<import("nestjs-dynamoose").Item<Notification>>;
    deleteNotification(id: string): Promise<void>;
    notification(id: string): Promise<import("nestjs-dynamoose").Item<Notification>>;
    notificationByUserId(userId: string): Promise<import("nestjs-dynamoose").QueryResponse<import("nestjs-dynamoose").Item<Notification>>>;
    notificationByTargetId(targetId: string): Promise<import("nestjs-dynamoose").QueryResponse<import("nestjs-dynamoose").Item<Notification>>>;
}
