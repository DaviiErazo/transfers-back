import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetRecipientByRecipientIdUseCase } from "./GetRecipientByRecipientIdUseCase";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { GetRecipientByRecipientIdDTO } from "./GetRecipientByRecipientIdDTO";
import * as express from "express";
import { RecipientMap } from "../../mappers/recipientMap";
import { GetRecipientByRecipientIdResponseDTO } from "./GetRecipientByRecipientIdResponseDTO";
import { GetRecipientByRecipientIdErrors } from "./GetRecipientByRecipientIdErrors";

export class GetRecipientByRecipientIdController extends BaseController {
  private useCase: GetRecipientByRecipientIdUseCase;

  constructor(useCase: GetRecipientByRecipientIdUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    try {
      const dto: GetRecipientByRecipientIdDTO = {
        recipientId: req.params.recipientId
      };

      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case GetRecipientByRecipientIdErrors.RecipientNotFoundError:
            return this.notFound(res, error.errorValue().message);
          default:
            return this.fail(res, error.errorValue().message);
        }
      } else {
        const recipient = result.value.getValue();
        return this.ok<GetRecipientByRecipientIdResponseDTO>(res, {
          recipient: RecipientMap.toDTO(recipient),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
