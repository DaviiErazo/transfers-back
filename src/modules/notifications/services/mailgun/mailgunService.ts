import { IEmail, INotificationService } from "../notificationService";
import { Mailgun } from "mailgun-js";

export class MailgunService implements INotificationService {
  private mailgun;

  constructor(mailgun: Mailgun) {
    this.mailgun = mailgun;
  }

  public async sendEmail(email: IEmail): Promise<void> {
    try {
      await this.mailgun.messages().send(email);
    } catch (error) {
      console.log(error);
    } finally {
      return;
    }
  }
}
