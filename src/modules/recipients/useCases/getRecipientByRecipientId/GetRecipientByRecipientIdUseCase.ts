import { Recipient } from "../../domain/recipient";
import { IRecipientRepo } from "../../repos/recipientRepo";
import { GetRecipientByRecipientIdDTO } from "./GetRecipientByRecipientIdDTO";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { AppError } from "../../../../shared/core/AppError";
import { GetRecipientByRecipientIdErrors } from "./GetRecipientByRecipientIdErrors";
import { UseCase } from "../../../../shared/core/UseCase";

type Response = Either<
  GetRecipientByRecipientIdErrors.RecipientNotFoundError | AppError.UnexpectedError,
  Result<Recipient>
>;

export class GetRecipientByRecipientIdUseCase
  implements UseCase<GetRecipientByRecipientIdDTO, Promise<Response>>
{
  private recipientRepo: IRecipientRepo;

  constructor(recipientRepo: IRecipientRepo) {
    this.recipientRepo = recipientRepo;
  }

  public async execute(request: GetRecipientByRecipientIdDTO): Promise<Response> {
    let recipient: Recipient;
    const { recipientId } = request;

    try {
      recipient = await this.recipientRepo.getRecipientByRecipientId(recipientId);
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
    return right(Result.ok<Recipient>(recipient));
  }
}
