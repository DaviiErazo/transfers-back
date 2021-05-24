import { Either, Result, left, right } from "../../../../shared/core/Result";
import { AppError } from "../../../../shared/core/AppError";
import { UseCase } from "../../../../shared/core/UseCase";
import { CreateTransferDTO } from "./CreateTransferDTO";
import { ITransferRepo } from "../../repos/transferRepo";
import { Transfer } from "../../domain/transfer";

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

export class CreateTransferUseCase implements UseCase<CreateTransferDTO, Promise<Response>> {
  private transferRepo: ITransferRepo;

  constructor(transferRepo: ITransferRepo) {
    this.transferRepo = transferRepo;
  }

  async execute(request: CreateTransferDTO): Promise<Response> {
    const recipientId = request.recipientId;
    const amount = request.amount;

    try {
      const transferOrError: Result<Transfer> = Transfer.create({
        recipientId,
        amount,
      });

      if (transferOrError.isFailure) {
        return left(Result.fail<Transfer>(transferOrError.error.toString())) as Response;
      }

      const transfer: Transfer = transferOrError.getValue();
      await this.transferRepo.save(transfer);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
