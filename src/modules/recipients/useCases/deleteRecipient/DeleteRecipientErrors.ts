
import { UseCaseError } from "../../../../shared/core/UseCaseError";
import { Result } from "../../../../shared/core/Result";

export namespace DeleteRecipientErrors {

  export class UserNotFoundError extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `Recipient not found`
      } as UseCaseError)
    }
  } 

}