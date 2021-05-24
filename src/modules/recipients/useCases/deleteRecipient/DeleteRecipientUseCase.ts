
import { DeleteRecipientDTO } from "./DeleteRecipientDTO";
import { DeleteRecipientErrors } from "./DeleteRecipientErrors";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { AppError } from "../../../../shared/core/AppError";
import { IRecipientRepo } from "../../repos/recipientRepo";
import { UseCase } from "../../../../shared/core/UseCase";

type Response = Either<
  AppError.UnexpectedError |
  DeleteRecipientErrors.UserNotFoundError,
  Result<void>
>

export class DeleteRecipientUseCase implements UseCase<DeleteRecipientDTO, Promise<Response>> {
  private recipientRepo: IRecipientRepo;

  constructor (recipientRepo: IRecipientRepo) {
    this.recipientRepo = recipientRepo;
  }

  public async execute (request: DeleteRecipientDTO): Promise<any> {
    try {
      const recipient = await this.recipientRepo.getRecipientByRecipientId(request.recipientId);
      const recipientFound = !!recipient === true;

      if (!recipientFound) {
        return left(
          new DeleteRecipientErrors.UserNotFoundError()
        )
      }

      await this.recipientRepo.deleteRecipientByRecipientId(request.recipientId);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}