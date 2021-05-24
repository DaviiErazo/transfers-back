import { Either, Result, left, right } from "../../../../shared/core/Result";
import { AppError } from "../../../../shared/core/AppError";
import { UseCase } from "../../../../shared/core/UseCase";
import { ITransferRepo } from "../../repos/transferRepo";
import { Transfer } from "../../domain/transfer";

type Response = Either<AppError.UnexpectedError, Result<Transfer[]>>;

export class GetTransfersUseCase implements UseCase<any, Promise<Response>> {
  private transferRepo: ITransferRepo;

  constructor(transferRepo: ITransferRepo) {
    this.transferRepo = transferRepo;
  }

  public async execute(): Promise<Response> {
    let results: Transfer[];

    try {
      results = await this.transferRepo.getAllTransfers();
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }

    return right(Result.ok<Transfer[]>(results));
  }
}
