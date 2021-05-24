import { GetTransfersController } from "./GetTransfersController";
import { GetTransfersUseCase } from "./getTransfersUseCase";
import { transferRepo } from "../../repos";

const getTransfersUseCase = new GetTransfersUseCase(transferRepo);
const getTransfersController = new GetTransfersController(getTransfersUseCase);

export { getTransfersUseCase, getTransfersController };
