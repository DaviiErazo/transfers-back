import { DeleteRecipientDTO } from "./DeleteRecipientDTO";
import { DeleteRecipientErrors } from "./DeleteRecipientErrors";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { AppError } from "../../../../shared/core/AppError";
import { IRecipientRepo } from "../../repos/recipientRepo";
import { UseCase } from "../../../../shared/core/UseCase";
import { Recipient } from "../../domain/recipient";

type Response = Either<
  AppError.UnexpectedError | DeleteRecipientErrors.RecipientNotFoundError,
  Result<void>
>;

export class DeleteRecipientUseCase implements UseCase<DeleteRecipientDTO, Promise<Response>> {
  private recipientRepo: IRecipientRepo;

  constructor(recipientRepo: IRecipientRepo) {
    this.recipientRepo = recipientRepo;
  }

  public async execute(req: DeleteRecipientDTO): Promise<any> {
    try {
      let recipient: Recipient;

      try {
        recipient = await this.recipientRepo.getRecipientByRecipientId(req.recipientId);
      } catch (error) {
        return left(new DeleteRecipientErrors.RecipientNotFoundError(req.recipientId));
      }

      recipient.delete();

      await this.recipientRepo.deleteRecipient(recipient);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
