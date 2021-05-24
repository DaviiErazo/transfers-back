import { Result } from "../../../shared/core/Result";
import { RecipientEmail } from "./recipientEmail";
import { RecipientRut } from "./recipientRut";
import { RecipientName } from "./recipientName";

let email: RecipientEmail;
let emailOrError: Result<RecipientEmail>;

let rut: RecipientRut;
let rutOrError: Result<RecipientRut>;

let name: RecipientName;
let nameOrError: Result<RecipientName>;

test("Should be able to create a valid email", () => {
  emailOrError = RecipientEmail.create("da.erazom@gmail.com");
  expect(emailOrError.isSuccess).toBe(true);
  email = emailOrError.getValue();
  expect(email.value).toBe("da.erazom@gmail.com");
});

test("Should fail to create an invalid email", () => {
  emailOrError = RecipientEmail.create("notvalid");
  expect(emailOrError.isSuccess).toBe(false);
});

test("Should be able to create a valid rut", () => {
  rutOrError = RecipientRut.create("18788484-5");
  expect(rutOrError.isSuccess).toBe(true);
  rut = rutOrError.getValue();
  expect(rut.value).toBe("18788484-5");
});

test("Should fail to create an invalid rut", () => {
  rutOrError = RecipientRut.create("1-1");
  expect(rutOrError.isSuccess).toBe(false);
});

test("Should be able to create a valid name", () => {
  nameOrError = RecipientName.create({ name: "David Erazo" });
  expect(nameOrError.isSuccess).toBe(true);
  name = nameOrError.getValue();
  expect(name.value).toBe("David Erazo");
});

test("Should fail to create an invalid name", () => {
  nameOrError = RecipientName.create({ name: null });
  expect(nameOrError.isSuccess).toBe(false);
});
