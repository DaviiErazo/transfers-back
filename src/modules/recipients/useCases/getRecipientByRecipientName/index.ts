import { GetRecipientByRecipientNameController } from "./GetRecipientByRecipientNameController";
import { GetRecipientByRecipientNameUseCase } from "./GetRecipientByRecipientNameUseCase";
import { recipientRepo } from "../../repos";

const getRecipientByRecipientNameUseCase = new GetRecipientByRecipientNameUseCase(recipientRepo);
const getRecipientByRecipientNameController = new GetRecipientByRecipientNameController(getRecipientByRecipientNameUseCase);

export { getRecipientByRecipientNameUseCase, getRecipientByRecipientNameController };
