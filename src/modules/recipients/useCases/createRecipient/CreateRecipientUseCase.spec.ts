import { Result } from "../../../../shared/core/Result";
import { Recipient } from "../../domain/recipient";
import { RecipientEmail } from "../../domain/recipientEmail";
import { RecipientName } from "../../domain/recipientName";
import { RecipientRut } from "../../domain/recipientRut";
import { IRecipientRepo } from "../../repos/recipientRepo";
import { CreateRecipientUseCase } from "./CreateRecipientUseCase";

class FakeRepo implements IRecipientRepo {
  async save(recipient: Recipient): Promise<void> {
    return;
  }

  async exists(recipientEmail: RecipientEmail): Promise<boolean> {
    return;
  }

  async getRecipientByRecipientId(recipientId: string) : Promise<Recipient> {
    return 
  }

  async deleteRecipientByRecipientId(recipientId: string) : Promise<boolean> {
    return 
  }
}

const fakeRepo = new FakeRepo();
const createRecipientUserCase = new CreateRecipientUseCase(fakeRepo);

let email: RecipientEmail;
let emailOrError: Result<RecipientEmail>;

let rut: RecipientRut;
let rutOrError: Result<RecipientRut>;

let name: RecipientName;
let nameOrError: Result<RecipientName>;

let phoneNumber: string;
let accountNumber: number;
let bank: string;
let type: string;

test("Should be able to create a valid recipient", async () => {
  emailOrError = RecipientEmail.create("da.erazom@gmail.com");
  email = emailOrError.getValue();

  rutOrError = RecipientRut.create("18788484-5");
  rut = rutOrError.getValue();

  nameOrError = RecipientName.create({ name: "David Erazo" });
  name = nameOrError.getValue();

  phoneNumber = "+56961315674";
  accountNumber = 12333123;

  bank = "Banco de Chile";
  type = "Cuenta Corriente";

  const result = await createRecipientUserCase.execute({
    name: name.value,
    email: email.value,
    rut: rut.value,
    accountNumber,
    phoneNumber,
    bank,
    type,
  });

  expect(result.isRight()).toBe(true);
});
