import { Transfer } from "../domain/transfer";

export interface ITransferRepo {
  save(transfer: Transfer): Promise<void>;
  getTransfers(): Promise<Transfer[]>;
}
