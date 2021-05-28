import { Recipient } from "../domain/recipient";
import { RecipientEmail } from "../domain/recipientEmail";
import { RecipientName } from "../domain/recipientName";

export interface IRecipientRepo {
  exists(recipientEmail: RecipientEmail): Promise<boolean>;
  save(recipient: Recipient): Promise<void>;
  getRecipientByRecipientId (recipientId: string): Promise<Recipient>;
  getRecipientByRecipientName (recipientName: string | RecipientName): Promise<Recipient[]>;
  deleteRecipient(recipient: Recipient): Promise<boolean>
}
