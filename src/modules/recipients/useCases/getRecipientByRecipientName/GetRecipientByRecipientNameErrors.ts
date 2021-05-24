
import { UseCaseError } from "../../../../shared/core/UseCaseError";
import { Result } from "../../../../shared/core/Result";

export namespace GetRecipientByNameErrors {

  export class RecipientNotFoundError extends Result<UseCaseError> {    
    constructor (name: string) {
      super(false, {
        message: `Couldn't find a member with the name ${name}`
      } as UseCaseError)
    }
  } 

}