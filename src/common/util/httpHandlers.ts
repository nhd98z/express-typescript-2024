import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";
import { BAD_REQUEST } from "../code";
import { Respo } from "../model/respo";

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const msg = `Invalid input: ${err.errors.map((e) => `${e.path.join(".")} is ${e.message}`).join("; ")}`;
      return res.status(BAD_REQUEST).send(Respo.failure(msg, null));
    }
    next(err);
  }
};
