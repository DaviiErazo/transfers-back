import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export interface RecipientRutProps {
  value: string;
}

export class RecipientRut extends ValueObject<RecipientRutProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: RecipientRutProps) {
    super(props);
  }

  private static isValidRut(rutParam: string) {
    const rut = this.rutClean(rutParam);

    let rutDigits = parseInt(rut.slice(0, -1), 10);
    let m = 0;
    let s = 1;

    while (rutDigits > 0) {
      s = (s + (rutDigits % 10) * (9 - (m++ % 6))) % 11;
      rutDigits = Math.floor(rutDigits / 10);
    }

    const checkDigit = s > 0 ? String(s - 1) : "K";

    return checkDigit !== rut.slice(-1) ? false : true;
  }

  private static rutClean(value: string) {
    return typeof value === "string"
      ? value.replace(/[^0-9kK]+/g, "").toUpperCase()
      : "";
  }

  public static create(rut: string): Result<RecipientRut> {
    if (!this.isValidRut(rut)) {
      return Result.fail<RecipientRut>("Rut not valid");
    } else {
      return Result.ok<RecipientRut>(new RecipientRut({ value: rut }));
    }
  }
}
