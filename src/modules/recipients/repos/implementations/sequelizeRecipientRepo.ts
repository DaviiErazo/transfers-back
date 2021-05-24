import { IRecipientRepo } from "../recipientRepo";
import { Recipient } from "../../domain/recipient";
import { RecipientEmail } from "../../domain/recipientEmail";

import { RecipientMap } from "../../mappers/recipientMap";

export class SequelizeRecipientRepo implements IRecipientRepo {
  private models: any;
  private Op: any;

  constructor(models: any, Op: any) {
    this.models = models;
    this.Op = Op;
  }

  private createBaseQuery(): any {
    return {
      where: {},
      limit: 15,
      offset: 0,
    };
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
    // const exists = await this.exists(recipient.email);

    const rawSequelizeUser = await RecipientMap.toPersistence(recipient);
    await recipientModel.create(rawSequelizeUser);

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
    const RecipientModel = this.models.Recipient;

    const Recipient = await RecipientModel.findOne({
      where: {
        recipient_id: recipientId,
      },
    });

    if (!!Recipient === false) throw new Error("Recipient not found.");

    await Recipient.destroy();

    return true;
  }

  async getRecipientByRecipientName(recipientName: string): Promise<Recipient[]> {
    const RecipientModel = this.models.Recipient;
    const detailsQuery = this.createBaseQuery();

    detailsQuery.where["recipient_name"] = {
      [this.Op.like]: `${recipientName}%`,
    };

    const recipients = await RecipientModel.findAll(detailsQuery);

    return recipients.map((r) => RecipientMap.toDomain(r.dataValues));
  }
}
