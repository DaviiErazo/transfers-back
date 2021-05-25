import { BankType } from '../../domain/bankType';
import { AccountType } from '../../domain/accountType';

export interface CreateRecipientDTO {
  recipientName: string;
  email: string;
  rut: string;
  accountNumber: number;
  phoneNumber: string;
  type: AccountType;
  bank: BankType;
}
