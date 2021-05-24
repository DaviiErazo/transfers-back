import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export interface RecipientEmailProps {
  value: string;
}

export class RecipientEmail extends ValueObject<RecipientEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: RecipientEmailProps) {
    super(props);
  }

  private static isValidEmail(email: string) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string): Result<RecipientEmail> {
    if (!this.isValidEmail(email)) {
      return Result.fail<RecipientEmail>("Email address not valid");
    } else {
      return Result.ok<RecipientEmail>(
        new RecipientEmail({ value: this.format(email) })
      );
    }
  }
}
