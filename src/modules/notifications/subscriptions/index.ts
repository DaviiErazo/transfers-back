import { AfterRecipientCreated } from "./afterRecipientCreated";
import { AfterTransferCreated } from "./afterTransferCreated";
import { sendNotificationUseCase } from "../useCases";
import { getRecipientByRecipientIdUseCase } from "../../recipients/useCases/getRecipientByRecipientId";

// Subscriptions
new AfterRecipientCreated(sendNotificationUseCase);
new AfterTransferCreated(sendNotificationUseCase, getRecipientByRecipientIdUseCase);
