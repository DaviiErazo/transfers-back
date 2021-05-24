import { IRecipientRepo } from "../recipientRepo";
import { Recipient } from "../../domain/recipient";
import { RecipientEmail } from "../../domain/recipientEmail";

import { RecipientMap } from "../../mappers/recipientMap";

export class SequelizeRecipientRepo implements IRecipientRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async exists(recipientEmail: RecipientEmail): Promise<boolean> {
    const RecipientModel = this.models.Recipient;
    const Recipient = await RecipientModel.findOne({
      where: {
        recipient_email: recipientEmail.value,
      },
    });
    return !!Recipient === true;
  }

  async save(recipient: Recipient): Promise<void> {
    const recipientModel = this.models.Recipient;
    const exists = await this.exists(recipient.email);

    if (!exists) {
      const rawSequelizeUser = await RecipientMap.toPersistence(recipient);
      await recipientModel.create(rawSequelizeUser);
    }

    return;
  }

  async getRecipientByRecipientId(recipientId: string): Promise<Recipient> {
    const RecipientModel = this.models.Recipient;
    const Recipient = await RecipientModel.findOne({
      where: {
        recipient_id: recipientId,
      },
    });

    if (!!Recipient === false) throw new Error("Recipient not found.");
    return RecipientMap.toDomain(Recipient);
  }

  async deleteRecipientByRecipientId(recipientId: string): Promise<boolean> {
    const recipientModel = this.models.Recipient;

    const Recipient = await recipientModel.findOne({
      where: {
        recipient_id: recipientId,
      },
    });

    if (!!Recipient === false) throw new Error("Recipient not found.");

    await Recipient.destroy();

    return true;
  }
}
