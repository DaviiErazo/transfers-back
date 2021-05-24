import express from "express";
import { createRecipientController } from "../../../useCases/createRecipient";
import { deleteRecipientController } from "../../../useCases/deleteRecipient";
import { getRecipientByRecipientNameController } from "../../../useCases/getRecipientByRecipientName";

const recipientRouter = express.Router();

recipientRouter.post("/", (req, res) => createRecipientController.execute(req, res));
recipientRouter.post("/:recipientId", (req, res) => deleteRecipientController.execute(req, res));
recipientRouter.get("/byName", (req, res) => getRecipientByRecipientNameController.execute(req, res));

export { recipientRouter };
