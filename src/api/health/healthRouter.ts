import express, { type Request, type Response, type Router } from "express";

import { OK } from "@/common/code";
import { Respo } from "@/common/model/respo";

export const healthRouter: Router = express.Router();

healthRouter.get("/", (_req: Request, res: Response) => {
  return res.status(OK).send(Respo.success("Service is healthy", null));
});
