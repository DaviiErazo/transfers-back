import { CreateRecipientController } from "./CreateRecipientController";
import { CreateRecipientUseCase } from "./CreateRecipientUseCase";
import { recipientRepo } from "../../repos";

const createRecipientUseCase = new CreateRecipientUseCase(recipientRepo);
const createRecipientController = new CreateRecipientController(createRecipientUseCase);

export { createRecipientUseCase, createRecipientController };
