import mg, { Mailgun } from "mailgun-js";
import { mailgunConfig } from "../../.././../config/mailgun";

const { domain, apiKey } = mailgunConfig;

const mailgun: Mailgun = mg({ apiKey, domain });

export { mailgun };
