import { UseCase } from "../../../../shared/core/UseCase";
import { CreateRecipientDTO } from "./CreateRecipientDTO";
import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { IRecipientRepo } from "../../repos/recipientRepo";
import { RecipientRut } from "../../domain/recipientRut";
import { RecipientEmail } from "../../domain/recipientEmail";
import { RecipientName } from "../../domain/recipientName";
import { CreateRecipientErrors } from "./CreateRecipientErrors";
import { Recipient } from "../../domain/recipient";

type Response = Either<
  CreateRecipientErrors.EmailAlreadyExistsError | AppError.UnexpectedError | Result<any>,
  Result<void>
>;

export class CreateRecipientUseCase implements UseCase<CreateRecipientDTO, Promise<Response>> {
  private recipientRepo: IRecipientRepo;

  constructor(recipientRepo: IRecipientRepo) {
    this.recipientRepo = recipientRepo;
  }

  async execute(request: CreateRecipientDTO): Promise<Response> {
    const emailOrError = RecipientEmail.create(request.email);
    const rutOrError = RecipientRut.create(request.rut);
    const nameOrError = RecipientName.create({ name: request.recipientName });
    const accountNumber = request.accountNumber;
    const phoneNumber = request.phoneNumber;
    const bank = request.bank;
    const type = request.type;

    const dtoResult = Result.combine([emailOrError, rutOrError, nameOrError]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.error)) as Response;
    }

    const email: RecipientRut = emailOrError.getValue();
    const rut: RecipientRut = rutOrError.getValue();
    const name: RecipientName = nameOrError.getValue();

    try {

      /*
      const recipientAlreadyExists = await this.recipientRepo.exists(email);

      if (recipientAlreadyExists) {
        return left(new CreateRecipientErrors.EmailAlreadyExistsError(email.value)) as Response;
      }
      */

      const recipientOrError: Result<Recipient> = Recipient.create({
        email,
        rut,
        name,
        accountNumber,
        phoneNumber,
        bank,
        type,
      });

      if (recipientOrError.isFailure) {
        return left(Result.fail<Recipient>(recipientOrError.error.toString())) as Response;
      }

      const recipient: Recipient = recipientOrError.getValue();
      await this.recipientRepo.save(recipient);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
