import express, { type Request, type RequestHandler, type Response, type Router } from "express";

import { ISE, NOT_FOUND, OK } from "@/common/code";
import { Respo } from "@/common/models/respo";
import { validateRequest } from "@/common/utils/httpHandlers";
import { logger } from "@/server";
import { zGetUser } from "./userModel";
import { UserRepository } from "./userRepository";

export const userRouter: Router = express.Router();

const userRepo = new UserRepository();

const getUsers: RequestHandler = async (_req: Request, res: Response) => {
  try {
    const users = await userRepo.findAllAsync();
    if (!users || users.length === 0) {
      return res.status(NOT_FOUND).send(Respo.failure("No Users found", null));
    }
    return res.status(OK).send(Respo.success("Users found", users));
  } catch (ex) {
    const msg = `Error finding all users: $${(ex as Error).message}`;
    logger.error(msg);
    return res.status(ISE).send(Respo.failure("An error occurred while retrieving users.", null));
  }
};
userRouter.get("/", getUsers);

const getUser: RequestHandler = async (_req: Request, res: Response) => {
  try {
    const req = zGetUser.parse(_req);
    const id = req.params.id;
    const user = await userRepo.findByIdAsync(id);
    if (!user) {
      return res.status(NOT_FOUND).send(Respo.failure("User not found", null));
    }
    return res.status(OK).send(Respo.success("User found", user));
  } catch (ex) {
    const msg = `Error finding user:, ${(ex as Error).message}`;
    logger.error(msg);
    return res.status(ISE).send(Respo.failure("An error occurred while finding user.", null));
  }
};
userRouter.get("/:id", validateRequest(zGetUser), getUser);
