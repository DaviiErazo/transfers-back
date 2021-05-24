import { DeleteRecipientController } from "./DeleteRecipientController";
import { DeleteRecipientUseCase } from "./DeleteRecipientUseCase";
import { recipientRepo } from "../../repos";

const deleteRecipientUseCase = new DeleteRecipientUseCase(recipientRepo);
const deleteRecipientController = new DeleteRecipientController(deleteRecipientUseCase);

export { deleteRecipientUseCase, deleteRecipientController };
