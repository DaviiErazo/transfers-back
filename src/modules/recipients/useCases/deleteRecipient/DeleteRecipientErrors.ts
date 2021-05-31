import { UseCaseError } from "../../../../shared/core/UseCaseError";
import { Result } from "../../../../shared/core/Result";

export namespace DeleteRecipientErrors {
  export class RecipientNotFoundError extends Result<UseCaseError> {
    constructor(recipientId: string) {
      super(false, {
        message: `Cound't find a recipient by recipient id ${recipientId}`,
      } as UseCaseError);
    }
  }
}
