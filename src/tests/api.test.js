const request = require("supertest");
const express = require("express");
const apiRoutes = require("../routes/api");

const app = express();
app.use("/api", apiRoutes);

const authHeader = {
  Authorization: "Basic " + Buffer.from("admin:password").toString("base64"),
};

describe("GET /api/products", () => {
  it("should return products", async () => {
    const res = await request(app).get("/api/products").set(authHeader);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should filter by category", async () => {
    const res = await request(app)
      .get("/api/products?category=beauty")
      .set(authHeader);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.every((p) => p.category === "beauty")).toBe(true);
  });
});
