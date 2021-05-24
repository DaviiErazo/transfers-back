
import { AppError } from "../../../shared/core/AppError";
import { Result, Either } from "../../../shared/core/Result";

export type NotificationResponse = Either<
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>