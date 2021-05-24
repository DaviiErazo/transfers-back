import { RecipientCreated } from "../../recipients/domain/events/RecipientCreated";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { SendNotificationUseCase } from "../useCases/SendNotificationUseCase";
import { DomainEvents } from "../../../shared/domain/events/DomainEvents";

export class AfterRecipientCreated implements IHandle<RecipientCreated> {
  private sendNotification: SendNotificationUseCase;

  constructor(sendNotification: SendNotificationUseCase) {
    this.setupSubscriptions();
    this.sendNotification = sendNotification;
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(this.onUserCreated.bind(this), RecipientCreated.name);
  }

  private async onUserCreated(event: RecipientCreated): Promise<void> {
    const { recipient } = event;

    try {
      await this.sendNotification.execute({
        userId: recipient.recipientId.id.toString(),
        email: recipient.email.value,
      });
      console.log(
        `[AfterRecipientCreated]: Successfully executed SendNotification use case AfterRecipientCreated`
      );
    } catch (err) {
      console.log(
        `[AfterRecipientCreated]: Failed to execute SendNotification use case AfterRecipientCreated.`
      );
    }
  }
}
