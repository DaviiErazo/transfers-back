import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

interface RecipientNameProps {
  name: string;
}

export class RecipientName extends ValueObject<RecipientNameProps> {
  public static maxLength: number = 15;
  public static minLength: number = 2;

  get value(): string {
    return this.props.name;
  }

  private constructor(props: RecipientNameProps) {
    super(props);
  }

  public static create(props: RecipientNameProps): Result<RecipientName> {
    const usernameResult = Guard.againstNullOrUndefined(props.name, "username");

    if (!usernameResult.succeeded) {
      return Result.fail<RecipientName>(usernameResult.message);
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.name);
    if (!minLengthResult.succeeded) {
      return Result.fail<RecipientName>(minLengthResult.message);
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.name);
    if (!maxLengthResult.succeeded) {
      return Result.fail<RecipientName>(maxLengthResult.message);
    }

    return Result.ok<RecipientName>(new RecipientName(props));
  }
}
