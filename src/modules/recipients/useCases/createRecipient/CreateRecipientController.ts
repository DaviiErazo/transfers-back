import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateRecipientUseCase } from "./CreateRecipientUseCase";
import { CreateRecipientDTO } from "./CreateRecipientDTO";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { CreateRecipientErrors } from "./CreateRecipientErrors";
import { TextUtils } from "../../../../shared/utils/TextUtils";


import * as express from "express";

export class CreateRecipientController extends BaseController {
  private useCase: CreateRecipientUseCase;

  constructor(useCase: CreateRecipientUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    let dto: CreateRecipientDTO = req.body as CreateRecipientDTO;

    dto = {
      name: TextUtils.sanitize(dto.name),
      email: TextUtils.sanitize(dto.email),
      rut: TextUtils.sanitize(dto.rut),
      phoneNumber: TextUtils.sanitize(dto.phoneNumber),
      accountNumber: dto.accountNumber,
      bank: TextUtils.sanitize(dto.bank),
      type: TextUtils.sanitize(dto.type)
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateRecipientErrors.EmailAlreadyExistsError:
            return this.conflict(res, error.errorValue().message);
          default:
            return this.fail(res, error.errorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
