import { SequelizeTransferRepo } from "./implementations/sequelizetransferRepo";
import models from "../../../shared/infra/database/sequelize/models";

const transferRepo = new SequelizeTransferRepo(models);

export { transferRepo };
