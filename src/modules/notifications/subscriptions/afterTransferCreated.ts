import { TransferCreated } from "../../transfers/domain/events/TransferCreated";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { SendNotificationUseCase } from "../useCases/SendNotificationUseCase";
import { DomainEvents } from "../../../shared/domain/events/DomainEvents";

export class AfterTransferCreated implements IHandle<TransferCreated> {
  private sendNotification: SendNotificationUseCase;

  constructor(sendNotification: SendNotificationUseCase) {
    this.setupSubscriptions();
    this.sendNotification = sendNotification;
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(this.onUserCreated.bind(this), TransferCreated.name);
  }

  private async onUserCreated(event: TransferCreated): Promise<void> {
    const { transfer } = event;

    try {
      /*
      await this.sendNotification.execute({
        userId: transfer.transferId.id.toString(),
        email: "da.erazom@gmail.com",
        
      });
      */
      console.log(
        `[AfterTransferCreated]: Successfully executed SendNotification use case AfterTransferCreated`
      );
    } catch (err) {
      console.log(
        `[AfterTransferCreated]: Failed to execute SendNotification use case AfterTransferCreated.`
      );
    }
  }
}
