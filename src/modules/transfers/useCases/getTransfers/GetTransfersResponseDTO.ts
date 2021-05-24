export interface TransferDTO {
    transferId: string;
    recipientId: string;
    amount: number;
}
export interface GetTransfersResponseDTO {
  transfers: TransferDTO[];
}