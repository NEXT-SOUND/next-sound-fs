import { CreateNotificationInput } from './create-notification.input';
import { NotificationStatus } from './notification.enum';
export type NotificationKey = {
    id: string;
};
export declare class Notification extends CreateNotificationInput {
    id: string;
    status: NotificationStatus;
    createAt: string;
}
