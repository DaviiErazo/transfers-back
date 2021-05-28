
import { UseCaseError } from "../../../../shared/core/UseCaseError";
import { Result } from "../../../../shared/core/Result";

export namespace GetRecipientByRecipientIdErrors {

  export class RecipientNotFoundError extends Result<UseCaseError> {    
    constructor (id: string) {
      super(false, {
        message: `Couldn't find a member with the id ${id}`
      } as UseCaseError)
    }
  } 

}