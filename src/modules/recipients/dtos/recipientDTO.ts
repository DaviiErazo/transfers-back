import { BankType } from '../domain/bankType';
import { AccountType } from '../domain/accountType';

export interface RecipientDTO {
  recipientName: string;
  recipientId: string;
  rut: string;
  email: string;
  phoneNumber: string;
  accountNumber: Number;
  type: AccountType;
  bank: BankType;
}
