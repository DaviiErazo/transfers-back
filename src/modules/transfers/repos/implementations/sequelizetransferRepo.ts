import { ITransferRepo } from "../transferRepo";
import { Transfer } from "../../domain/transfer";
import { TransferMap } from "../../mappers/transferMap";

export class SequelizeTransferRepo implements ITransferRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async save(transfer: Transfer): Promise<void> {
    const transferModel = this.models.Transfer;

    const rawSequelizeTransfer = await TransferMap.toPersistence(transfer);
    await transferModel.create(rawSequelizeTransfer);

    return;
  }

  async getAllTransfers(): Promise<Transfer[]> {
    const TransferModel = this.models.Transfer;

    const Transfer = await TransferModel.findAll();

    const transfers = Transfer.map((m) => TransferMap.toDomain(m.dataValues));

    return transfers;
  }
}
