import { Recipient } from "../recipient";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

export class RecipientDeleted implements IDomainEvent {
  public dateTimeOccurred: Date;
  public recipient: Recipient;

  constructor(recipient: Recipient) {
    this.dateTimeOccurred = new Date();
    this.recipient = recipient;
  }

  getAggregateId(): UniqueEntityID {
    return this.recipient.id;
  }
}
