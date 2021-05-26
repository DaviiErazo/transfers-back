import { ITransferRepo } from "../transferRepo";
import { Transfer } from "../../domain/transfer";
import { TransferMap } from "../../mappers/transferMap";

export class SequelizeTransferRepo implements ITransferRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async save(transfer: Transfer): Promise<void> {
    const TransferModel = this.models.Transfer;

    const rawSequelizeTransfer = await TransferMap.toPersistence(transfer);
    await TransferModel.create(rawSequelizeTransfer);

    return;
  }

  async getTransfers(): Promise<Transfer[]> {
    let limit = 15

    // IMPROVE THIS
    const Result = await this.models.sequelize.query(
      `SELECT R.recipient_email, R.recipient_id, R.recipient_name, R.recipient_bank, R.recipient_type, T.transfer_amount
        FROM transfer T
        INNER JOIN recipient as R ON R.recipient_id = T.recipient_id limit ${limit}`
    );

    const transfers = Result[0].map((t) => {
      return {
        email: t.recipient_email,
        recipientName: t.recipient_name,
        bank: t.recipient_bank,
        type: t.recipient_type,
        amount: t.transfer_amount,
      };
    });

    return transfers;
  }
}
