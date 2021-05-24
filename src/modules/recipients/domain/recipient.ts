import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Guard } from "../../../shared/core/Guard";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

import { RecipientEmail } from "./recipientEmail";
import { RecipientId } from "./recipientId";
import { RecipientName } from "./recipientName";
import { RecipientRut } from "./recipientRut";
import { RecipientCreated } from "./events/RecipientCreated";

interface RecipientProps {
  email: RecipientEmail;
  name: RecipientName;
  rut: RecipientRut;
  phoneNumber: string;
  accountNumber: Number;
  bank: string;
  type: string;
}

export class Recipient extends AggregateRoot<RecipientProps> {
  get recipientId(): RecipientId {
    return RecipientId.create(this._id).getValue();
  }

  get email(): RecipientEmail {
    return this.props.email;
  }

  get recipientname(): RecipientName {
    return this.props.name;
  }

  get rut(): RecipientRut {
    return this.props.rut;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  get accountNumber(): Number {
    return this.props.accountNumber;
  }

  get bank(): string {
    return this.props.bank;
  }

  get type(): string {
    return this.props.type;
  }

  private constructor(props: RecipientProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: RecipientProps, id?: UniqueEntityID) {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: "name" },
      { argument: props.email, argumentName: "email" },
      { argument: props.rut, argumentName: "rut" },
      { argument: props.phoneNumber, argumentName: "phoneNumber" },
      { argument: props.accountNumber, argumentName: "accountNumber" },
      { argument: props.bank, argumentName: "bank" },
      { argument: props.type, argumentName: "type" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Recipient>(guardResult.message);
    }

    const isNewRecipient = !!id === false;

    const recipient = new Recipient({ ...props }, id);

    if (isNewRecipient) {
      recipient.addDomainEvent(new RecipientCreated(recipient));
    }

    return Result.ok<Recipient>(recipient);
  }
}
