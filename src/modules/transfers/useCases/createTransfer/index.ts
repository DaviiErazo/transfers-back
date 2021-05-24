import { CreateTransferController } from "./CreateTransferController";
import { CreateTransferUseCase } from "./CreateTransferUseCase";
import { transferRepo } from "../../repos";

const createTransferUseCase = new CreateTransferUseCase(transferRepo);
const createTransferController = new CreateTransferController(createTransferUseCase);

export { createTransferUseCase, createTransferController };
