import express from "express";
import { createTransferController } from "../../../useCases/createTransfer";
import { getTransfersController } from "../../../useCases/getTransfers";

const transferRouter = express.Router();

transferRouter.post("/", (req, res) => createTransferController.execute(req, res));
transferRouter.get("/", (req, res) => getTransfersController.execute(req, res));

export { transferRouter };
