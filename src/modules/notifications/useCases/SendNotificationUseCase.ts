import { NotificationDTO } from "./NotificationDTO";
import { NotificationResponse } from "./NotificationResponse";
import { UseCase } from "../../../shared/core/UseCase";
import { INotificationService, IEmail } from "../services/notificationService";

export class SendNotificationUseCase
  implements UseCase<NotificationDTO, Promise<NotificationResponse>>
{
  private services: INotificationService;

  constructor(services: INotificationService) {
    this.services = services;
  }

  public async execute(req: NotificationDTO): Promise<NotificationResponse> {
    const data: IEmail = {
      from: "David Erazo da.erazom@gmail.com",
      to: req.email,
      subject: "Desafio Ripley",
      text: `El destinatario ${req.name} ha sido creado correctamente! 🥳`,
    };

    await this.services.sendEmail(data);

    return;
  }
}
