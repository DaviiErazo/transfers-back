import { NotificationDTO } from "./NotificationDTO";
import { NotificationResponse } from "./NotificationResponse";
import { UseCase } from "../../../shared/core/UseCase";

export class SendNotificationUseCase implements UseCase<NotificationDTO, Promise<NotificationResponse>>{
    public async execute (req: NotificationDTO): Promise<NotificationResponse> {
        console.log("*************************************************************");
        console.log("sending email...");
        console.log(req.email);
        console.log("*************************************************************");
        return
    }
}
