import { GetRecipientByRecipientIdController } from "./GetRecipientByRecipientIdController";
import { GetRecipientByRecipientIdUseCase } from "./GetRecipientByRecipientIdUseCase";
import { recipientRepo } from "../../repos";

const getRecipientByRecipientIdUseCase = new GetRecipientByRecipientIdUseCase(recipientRepo);
const getRecipientByRecipientIdController = new GetRecipientByRecipientIdController(getRecipientByRecipientIdUseCase);

export { getRecipientByRecipientIdUseCase, getRecipientByRecipientIdController };