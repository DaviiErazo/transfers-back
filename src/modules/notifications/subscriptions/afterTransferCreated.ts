import { TransferCreated } from "../../transfers/domain/events/TransferCreated";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { SendNotificationUseCase } from "../useCases/SendNotificationUseCase";
import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { GetRecipientByRecipientIdUseCase } from "../../recipients/useCases/getRecipientByRecipientId/GetRecipientByRecipientIdUseCase";

export class AfterTransferCreated implements IHandle<TransferCreated> {
  private sendNotification: SendNotificationUseCase;
  private getRecipientById: GetRecipientByRecipientIdUseCase;

  constructor(
    sendNotification: SendNotificationUseCase,
    getRecipientById: GetRecipientByRecipientIdUseCase
  ) {
    this.setupSubscriptions();
    this.sendNotification = sendNotification;
    this.getRecipientById = getRecipientById;
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(this.onTransferCreated.bind(this), TransferCreated.name);
  }

  private async onTransferCreated(event: TransferCreated): Promise<void> {
    try {
      const { transfer } = event;
      const recipientId = transfer.recipientId;

      const result = await this.getRecipientById.execute({ recipientId });

      if (result.isLeft()) {
        return;
      } else {
        const recipient = result.value.getValue();
        await this.sendNotification.execute({
          email: `David Erazo ${recipient.email.value}`,
          subject: "Desafio Ripley",
          message: `Se ha realizado una transacción de monto: $${transfer.amount}`,
          from: "da.erazom@gmail.com",
        });

        console.log(
          `[AfterTransferCreated]: Successfully executed SendNotification use case AfterTransferCreated`
        );
        return;
      }
    } catch (err) {
      console.log(
        `[AfterTransferCreated]: Failed to execute SendNotification use case AfterTransferCreated.`
      );
    }
  }
}
