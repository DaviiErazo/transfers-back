import { SendNotificationUseCase } from "../useCases/SendNotificationUseCase";
import { notificationService } from "../services";

const sendNotificationUseCase = new SendNotificationUseCase(notificationService);

export { sendNotificationUseCase };
