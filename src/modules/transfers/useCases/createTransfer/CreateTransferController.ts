import * as express from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateTransferUseCase } from "./CreateTransferUseCase";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { CreateTransferDTO } from "./CreateTransferDTO";
import { TextUtils } from "../../../../shared/utils/TextUtils";

export class CreateTransferController extends BaseController {
  private useCase: CreateTransferUseCase;

  constructor(useCase: CreateTransferUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    let dto: CreateTransferDTO = req.body as CreateTransferDTO;

    dto = {
      recipientId: TextUtils.sanitize(dto.recipientId),
      amount: dto.amount,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
