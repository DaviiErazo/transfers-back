import * as express from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetTransfersUseCase } from "./GetTransfersUseCase";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";

export class GetTransfersController extends BaseController {
  private useCase: GetTransfersUseCase;

  constructor(useCase: GetTransfersUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    try {
      const result = await this.useCase.execute();

      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      } else {
        const transfersResult = result.value.getValue();
        return this.ok<any>(res, {
          transfers: transfersResult
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
