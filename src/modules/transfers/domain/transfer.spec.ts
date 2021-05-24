import { Result } from "../../../shared/core/Result";
import { Transfer } from "./transfer";

let result: Result<Transfer>;
let transfer: Transfer;

let recipientId: string;
let amount: number;

test("Should be able to create a valid transfer", () => {
  recipientId = "d223sas1f345";
  amount = 1233123123;

  result = Transfer.create({ recipientId, amount });
  transfer = result.getValue();

  expect(result.isSuccess).toBe(true);
  expect(transfer.amount).toBe(amount);
  expect(transfer.recipientId).toBe(recipientId);
});

test("Should fail to create an invalid tranfer", () => {
  recipientId = "d223sas1f345";
  amount = null;

  result = Transfer.create({ recipientId, amount });

  expect(result.isFailure).toBe(true);
});
