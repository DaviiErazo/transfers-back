import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetRecipientByRecipientNameUseCase } from "./GetRecipientByRecipientNameUseCase";
import { DecodedExpressRequest } from "../../../../modules/recipients/infra/http/models/decodedRequest";
import { GetRecipientByRecipientNameDTO } from "./GetRecipientByRecipientNameDTO";
import { GetRecipientByRecipientNameResponseDTO } from "./GetRecipientByRecipientNameResponseDTO";
import * as express from 'express'
import { RecipientMap } from "../../mappers/recipientMap";

export class GetRecipientByRecipientNameController extends BaseController {
    private useCase: GetRecipientByRecipientNameUseCase;
  
    constructor (useCase: GetRecipientByRecipientNameUseCase) {
      super();
      this.useCase = useCase;
    }
  
    async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
  
      const dto: GetRecipientByRecipientNameDTO = {
        recipientName: req.query.recipientName
      } as GetRecipientByRecipientNameDTO
  
      try {
        const result = await this.useCase.execute(dto);
  
        if (result.isLeft()) {
          const error = result.value;
    
          switch (error.constructor) {
            default:
              return this.fail(res, error.errorValue().message);
          }
          
        } else {
          const recipientsDetail = result.value.getValue();

          return this.ok<GetRecipientByRecipientNameResponseDTO>(res, {
            recipients: recipientsDetail.map((c) => RecipientMap.toDTO(c))
          });
        }
  
      } catch (err) {
        return this.fail(res, err)
      }
    }
  }