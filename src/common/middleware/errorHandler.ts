import type { ErrorRequestHandler, RequestHandler } from "express";

import { NOT_FOUND } from "../code";

const unexpectedRequest: RequestHandler = (_req, res) => {
  res.sendStatus(NOT_FOUND);
};

const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
  res.locals.err = err;
  next(err);
};

export default () => [unexpectedRequest, addErrorToRequestLog];
