import { AfterRecipientCreated } from "./afterRecipientCreated";
import { AfterTransferCreated } from "./afterTransferCreated";
import { sendNotificationUseCase } from "../useCases";

// Subscriptions
new AfterRecipientCreated(sendNotificationUseCase);
new AfterTransferCreated(sendNotificationUseCase);
