import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Transfer } from "../domain/transfer";
import { TransferDTO } from "../useCases/getTransfers/GetTransfersResponseDTO"

export class TransferMap implements Mapper<Transfer> {
  public static async toPersistence(transfer: Transfer): Promise<any> {
    return {
      transfer_id: transfer.transferId.id.toString(),
      recipient_id: transfer.recipientId,
      transfer_amount: transfer.amount,
    };
  }

  public static toDomain(raw: any): Transfer {

    const transferOrError = Transfer.create(
      {
        recipientId: raw.recipient_id,
        amount: raw.transfer_amount
      },
      new UniqueEntityID(raw.transfer_id)
    );

    transferOrError.isFailure ? console.log(transferOrError.error) : "";

    return transferOrError.isSuccess ? transferOrError.getValue() : null;
  }

  public static toDTO (transfer: Transfer): TransferDTO {
    return {
      recipientId: transfer.recipientId,
      transferId: transfer.transferId.id.toString(),
      amount: transfer.amount
    }
  } 
}
