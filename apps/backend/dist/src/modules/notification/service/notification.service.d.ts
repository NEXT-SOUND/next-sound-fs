import { Model } from 'nestjs-dynamoose';
import { CreateNotificationInput } from '../model/create-notification.input';
import { Notification, NotificationKey } from '../model/notification.model';
import { UpdateNotificationInput } from '../model/update-notification.input';
export declare class NotificationService {
    private readonly model;
    constructor(model: Model<Notification, NotificationKey>);
    create(input: CreateNotificationInput): Promise<import("nestjs-dynamoose").Item<Notification>>;
    update(key: NotificationKey, input: UpdateNotificationInput): Promise<import("nestjs-dynamoose").Item<Notification>>;
    delete(key: NotificationKey): Promise<void>;
    findOne(key: NotificationKey): Promise<import("nestjs-dynamoose").Item<Notification>>;
    findByTargetId(targetId: string): Promise<import("nestjs-dynamoose").QueryResponse<import("nestjs-dynamoose").Item<Notification>>>;
    findByUserId(userId: string): Promise<import("nestjs-dynamoose").QueryResponse<import("nestjs-dynamoose").Item<Notification>>>;
}
