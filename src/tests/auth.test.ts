import supertest from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import app from "../../app.js";
import prisma from "../config/database.js";

const agent = supertest(app);

const validEmail = {email: "henrique@gmail.com", password: "1234"};
const invalidEmail = {email: "henriquegmail.com", password: "1234"};
const invalidRequestBody1 = {email: "henrique@gmail.com"};
const invalidRequestBody2 = {password: "1234"};

//beforeAll(async () => {
//});

beforeEach( async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("POST /sign-up", () => {

  it("given a valid email/password, it should return 201", async () => {
    const result = await agent.post("/sign-up").send(validEmail);
    expect(result.status).toEqual(201);
  });

  it("given a valid email/password, it should create a new row in database", async () => {
    await agent.post("/sign-up").send(validEmail);
    const result = await prisma.user.findUnique({where: {email: validEmail.email}});
    expect(result).toHaveProperty("id");
    expect(result.email).toEqual(validEmail.email);
    expect(bcrypt.compareSync(validEmail.password,result.password)).toStrictEqual(true);
  });

  it("given an invalid email, it should return 422", async () => {
    const result = await agent.post("/sign-up").send(invalidEmail);
    expect(result.status).toEqual(422);
  }); 

  it("given an invalid email, it shouldn't create a new row in database", async () => {
    await agent.post("/sign-up").send(invalidEmail);
    const result = await prisma.user.findUnique({where: {email: invalidEmail.email}});
    expect(result).toBeNull();
  });

  it("given an invalid request body, it should return 422", async () => {
    const result1 = await agent.post("/sign-up").send(invalidRequestBody1);
    const result2 = await agent.post("/sign-up").send(invalidRequestBody2);
    expect(result1.status).toEqual(422);
    expect(result2.status).toEqual(422);
  });

  it("given an invalid request body, it shouldn't create a new row in database", async () => {
    await agent.post("/sign-up").send(invalidRequestBody1);
    const result = await prisma.user.findUnique({where: {email: invalidRequestBody1.email}});
    expect(result).toBeNull();
  });

  it("given an email already registered, it should return 409", async () => {
    await agent.post("/sign-up").send(validEmail);
    const result = await agent.post("/sign-up").send(validEmail);
    expect(result.status).toEqual(409);
  });

});

describe("POST /sign-in", () => {

  it("given a valid email/password it should return 200", async () => {
    await agent.post("/sign-up").send(validEmail);
    const result = await agent.post("/sign-in").send(validEmail);
    expect(result.status).toEqual(200);
  });

  it("given a valid email/password it should return a valid JWT token", async () => {
    await agent.post("/sign-up").send(validEmail);
    const result = await agent.post("/sign-in").send(validEmail);
    expect(validateJWT(result.body.token)).toStrictEqual(true);
  });

  it("given the wrong password it should return 401", async () => {
    await agent.post("/sign-up").send(validEmail);
    const result = await agent.post("/sign-in").send({...validEmail, password: "wrongPassword"});
    expect(result.status).toEqual(401);
  });

  it("given the wrong password it shouldn't return a JWT token", async () => {
    await agent.post("/sign-up").send(validEmail);
    const result = await agent.post("/sign-in").send({...validEmail, password: "wrongPassword"});
    expect(result.body.token).toBeUndefined();
  });

  it("given an unregistered email it should return 401", async () => {
    const result = await agent.post("/sign-in").send(validEmail);
    expect(result.status).toEqual(401);
  });

  it("given an unregistered email it shouldn't return a JWT token", async () => {
    const result = await agent.post("/sign-in").send(validEmail);
    expect(result.body.token).toBeUndefined();
  });

  it("given an invalid request body it should return 422", async () => {
    await agent.post("/sign-up").send(validEmail);
    const result1 = await agent.post("/sign-in").send(invalidRequestBody1);
    expect(result1.status).toEqual(422);
  });

  it("given an invalid request body it shouldn't return a JWT token", async () => {
    await agent.post("/sign-up").send(validEmail);
    const result = await agent.post("/sign-in").send(invalidRequestBody1);
    expect(result.body.token).toBeUndefined();
  });

});

afterAll(async () => {
  await prisma.$disconnect();
});

function validateJWT(token: string): boolean {
  const jwtKey = process.env.JWT_SECRET;
  try {
    if (jwt.verify(token, jwtKey))
      return true;
  } catch (error) {
    return false;
  }
}