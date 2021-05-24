
import { SequelizeRecipientRepo } from "./implementations/sequelizeRecipientRepo";
import models from "../../../shared/infra/database/sequelize/models";

const recipientRepo = new SequelizeRecipientRepo(models);

export { recipientRepo }
