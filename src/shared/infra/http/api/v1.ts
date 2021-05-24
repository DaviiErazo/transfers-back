import express from "express";
import { recipientRouter } from "../../../../modules/recipients/infra/http/routes";
import { transferRouter } from "../../../../modules/transfers/infra/http/routes";

const v1Router = express.Router();

v1Router.get("/", (req, res) => {
  return res.json({ message: "Hello world" });
});

v1Router.use("/recipients", recipientRouter);
v1Router.use("/transfers", transferRouter);

export { v1Router };
