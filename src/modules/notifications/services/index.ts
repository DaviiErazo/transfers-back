import { MailgunService } from "./mailgun/mailgunService";
import { mailgun } from "./mailgun/mailgunConnection";

const notificationService = new MailgunService(mailgun);

export { notificationService };
