import { IRecipientRepo } from "../recipientRepo";
import { Recipient } from "../../domain/recipient";
import { RecipientId } from "../../domain/recipientId";

import { RecipientMap } from "../../mappers/recipientMap";
import { RecipientName } from "../../domain/recipientName";

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

  async exists(recipientId: RecipientId): Promise<boolean> {
    const RecipientModel = this.models.Recipient;
    const Recipient = await RecipientModel.findOne({
      where: {
        recipient_id: recipientId.id.toString(),
      },
    });
    return !!Recipient === true;
  }

  async save(recipient: Recipient): Promise<void> {
    const recipientModel = this.models.Recipient;

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

  async deleteRecipient(recipient: Recipient): Promise<boolean> {
    const RecipientModel = this.models.Recipient;
  
    const rawSequelizeRecipient = { is_deleted: true };    

    await RecipientModel.update(rawSequelizeRecipient, {
      individualHooks: true,
      hooks: true,
      where: { recipient_id: recipient.id.toString() },
    });

    return true;
  }

  async getRecipientByRecipientName(recipientName: string | RecipientName): Promise<Recipient[]> {
    const RecipientModel = this.models.Recipient;
    const detailsQuery = this.createBaseQuery();

    detailsQuery.where["recipient_name"] = {
      [this.Op.like]: `${
        recipientName instanceof RecipientName
          ? (<RecipientName>recipientName).value
          : recipientName
      }%`,
    };

    detailsQuery.where["is_deleted"] = false;

    const recipients = await RecipientModel.findAll(detailsQuery);

    return recipients.map((r) => RecipientMap.toDomain(r.dataValues));
  }
}
