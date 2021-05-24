import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Recipient } from "../domain/recipient";
import { RecipientEmail } from "../domain/recipientEmail";
import { RecipientName } from "../domain/recipientName";
import { RecipientRut } from "../domain/recipientRut";

export class RecipientMap implements Mapper<Recipient> {
  public static async toPersistence(recipient: Recipient): Promise<any> {
    return {
      recipient_id: recipient.recipientId.id.toString(),
      recipient_email: recipient.email.value,
      recipient_name: recipient.recipientname.value,
      recipient_rut: recipient.rut.value,
      recipient_phone_number: recipient.phoneNumber,
      recipient_account_number: recipient.accountNumber,
      recipient_type: recipient.type,
      recipient_bank: recipient.bank,
    };
  }

  public static toDomain(raw: any): Recipient {
    const nameOrError = RecipientName.create({ name: raw.recipient_name });
    const rutOrError = RecipientRut.create(raw.recipient_rut);
    const emailOrError = RecipientEmail.create(raw.recipient_email);

    const recipientOrError = Recipient.create(
      {
        name: nameOrError.getValue(),
        rut: rutOrError.getValue(),
        email: emailOrError.getValue(),
        accountNumber: raw.recipient_account_number,
        phoneNumber: raw.recipient_phone_number,
        bank: raw.bank,
        type: raw.type,
      },
      new UniqueEntityID(raw.recipient_id)
    );

    recipientOrError.isFailure ? console.log(recipientOrError.error) : "";

    return recipientOrError.isSuccess ? recipientOrError.getValue() : null;
  }
}
