import { Transfer } from "../transfer";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

export class TransferCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public transfer: Transfer;

  constructor(transfer: Transfer) {
    this.dateTimeOccurred = new Date();
    this.transfer = transfer;
  }

  getAggregateId(): UniqueEntityID {
    return this.transfer.id;
  }
}
