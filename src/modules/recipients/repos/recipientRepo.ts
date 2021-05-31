import { Recipient } from "../domain/recipient";
import { RecipientId } from "../domain/recipientId";
import { RecipientName } from "../domain/recipientName";

export interface IRecipientRepo {
  exists(recipientId: RecipientId): Promise<boolean>;
  save(recipient: Recipient): Promise<void>;
  getRecipientByRecipientId (recipientId: string): Promise<Recipient>;
  getRecipientByRecipientName (recipientName: string | RecipientName): Promise<Recipient[]>;
  deleteRecipient(recipient: Recipient): Promise<boolean>
}
