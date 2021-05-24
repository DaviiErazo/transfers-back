import express from "express";
import { createRecipientController } from "../../../useCases/createRecipient";
import { deleteRecipientController } from "../../../useCases/deleteRecipient";


const recipientRouter = express.Router();

recipientRouter.post("/", (req, res) => createRecipientController.execute(req, res));
recipientRouter.post("/:recipientId", (req, res) => deleteRecipientController.execute(req, res));


export { recipientRouter };
