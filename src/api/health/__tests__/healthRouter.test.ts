import request from "supertest";

import { OK } from "@/common/code";
import type { Respo } from "@/common/models/respo";
import { app } from "@/server";

describe("Health Check API endpoints", () => {
  it("GET / - success", async () => {
    const response = await request(app).get("/health");
    const result: Respo = response.body;

    expect(response.statusCode).toEqual(OK);
    expect(result.success).toBeTruthy();
    expect(result.data).toBeNull();
    expect(result.message).toEqual("Service is healthy");
  });
});
