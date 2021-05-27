import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { TransferCreated } from "./events/TransferCreated";
import { TransferId } from "./transferId";

interface TransferProps {
  recipientId: string;
  amount: number;
}

export class Transfer extends AggregateRoot<TransferProps> {
  get transferId(): TransferId {
    return TransferId.create(this._id).getValue();
  }

  get recipientId(): string {
    return this.props.recipientId;
  }

  get amount(): number {
    return this.props.amount;
  }

  private constructor(props: TransferProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: TransferProps, id?: UniqueEntityID) {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.amount, argumentName: "amount" },
      { argument: props.recipientId, argumentName: "recipientId" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Transfer>(guardResult.message);
    }

    const isNewTransfer = !!id === false;
    const transfer = new Transfer({ ...props }, id);

    if (isNewTransfer) {
      // transfer.addDomainEvent(new TransferCreated(transfer));
    }

    return Result.ok<Transfer>(transfer);
  }
}
