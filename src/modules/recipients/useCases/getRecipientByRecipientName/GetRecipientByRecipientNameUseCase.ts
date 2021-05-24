import { AppError } from "../../../../shared/core/AppError";
import { UseCase } from "../../../../shared/core/UseCase";
import { Result, Either, left, right } from "../../../../shared/core/Result";
import { GetRecipientByNameErrors } from "./GetRecipientByRecipientNameErrors";
import { GetRecipientByRecipientNameDTO } from "./GetRecipientByRecipientNameDTO";
import { IRecipientRepo } from "../../repos/recipientRepo";
import { Recipient } from "../../domain/recipient";

type Response = Either<
  AppError.UnexpectedError | GetRecipientByNameErrors.RecipientNotFoundError,
  Result<Recipient[]>
>;

export class GetRecipientByRecipientNameUseCase
  implements UseCase<GetRecipientByRecipientNameDTO, Promise<Response>>
{
  private recipientRepo: IRecipientRepo;

  constructor(recipientRepo: IRecipientRepo) {
    this.recipientRepo = recipientRepo;
  }

  public async execute(request: GetRecipientByRecipientNameDTO): Promise<Response> {
    let recipientsDetail: Recipient[];
    const { recipientName } = request;

    try {
      recipientsDetail = await this.recipientRepo.getRecipientByRecipientName(recipientName);
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }

    return right(Result.ok<Recipient[]>(recipientsDetail));
  }
}
