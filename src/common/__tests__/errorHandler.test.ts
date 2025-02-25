import express, { type Express } from "express";
import request from "supertest";

import errorHandler from "@/common/middleware/errorHandler";
import { ISE, NOT_FOUND } from "../code";

describe("Error Handler Middleware", () => {
  let app: Express;

  beforeAll(() => {
    app = express();

    app.get("/error", () => {
      throw new Error("Test error");
    });
    app.get("/next-error", (_req, _res, next) => {
      const error = new Error("Error passed to next()");
      next(error);
    });

    app.use(errorHandler());
    app.use("*", (_req, res) => res.status(NOT_FOUND).send("Not Found"));
  });

  describe("Handling unknown routes", () => {
    it("returns 404 for unknown routes", async () => {
      const response = await request(app).get("/this-route-does-not-exist");
      expect(response.status).toBe(NOT_FOUND);
    });
  });

  describe("Handling thrown errors", () => {
    it("handles thrown errors with a 500 status code", async () => {
      const response = await request(app).get("/error");
      expect(response.status).toBe(ISE);
    });
  });

  describe("Handling errors passed to next()", () => {
    it("handles errors passed to next() with a 500 status code", async () => {
      const response = await request(app).get("/next-error");
      expect(response.status).toBe(ISE);
    });
  });
});
