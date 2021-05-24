import { Recipient } from "../domain/recipient";
import { RecipientEmail } from "../domain/recipientEmail";

export interface IRecipientRepo {
  exists(recipientEmail: RecipientEmail): Promise<boolean>;
  save(recipient: Recipient): Promise<void>;
  getRecipientByRecipientId (recipientId: string): Promise<Recipient>;
  deleteRecipientByRecipientId (recipientId: string): Promise<boolean>
  // getRecipientByRecipientName(recipientName: RecipientName | string): Promise<Recipient>;
}
