import supertest from "supertest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import app from "../../app.js";
import prisma from "../config/database.js";

const agent = supertest(app);

const validTest = {
  "name": "Globo.com",
  "pdfUrl": "http://www.google.com",
  "categoryId": 1,
  "teacherId": 1,
  "disciplineId": 1
};
const invalidRequestBody = {
  name: "globo.com",
  categoryId: 1,
  teacherId: 1,
  disciplineId: 1
};
const secretKey = process.env.JWT_SECRET;
const JWTtoken = "Bearer " + jwt.sign({id: 1, email: "henrique@gmail.com"}, secretKey);

beforeAll(async () => {
  
  await prisma.term.createMany({
    data: [
        {number: 1},
        {number: 2},
        {number: 3},
        {number: 4},
        {number: 5},
        {number: 6}  
    ],
    skipDuplicates: true,
  });

  await prisma.category.createMany({
      data:[
          {name: 'Projeto'},
          {name: 'Prática'},
          {name: 'Recuperação'}
      ],
      skipDuplicates: true,
  });

  await prisma.teacher.createMany({
      data: [
          {name: 'Diego Pinho'},
          {name: 'Bruna Hamori'}
      ],
      skipDuplicates: true,
  });

  await prisma.discipline.createMany({
      data: [
          {name: 'HTML e CSS', termId: 1},
          {name: 'JavaScript', termId: 2},
          {name: 'React', termId: 3},
          {name: 'Humildade', termId: 4},
          {name: 'Planejamento', termId: 5},
          {name: 'Autoconfiança', termId: 6}
      ],
      skipDuplicates: true,
  });

  await prisma.teacherDiscipline.createMany({
      data: [
          {teacherId: 1, disciplineId:1},
          {teacherId: 1, disciplineId:2},
          {teacherId: 1, disciplineId:3},
          {teacherId: 2, disciplineId:4},
          {teacherId: 2, disciplineId:5},
          {teacherId: 2, disciplineId:6}
      ],
      skipDuplicates: true,
  });
});

beforeEach( async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe("POST /tests", () => {

  it("given a valid test, it should return 201", async () => {
    const result = await agent.post("/tests").send(validTest).set("Authorization", JWTtoken);
    expect(result.status).toEqual(201);
  });

  it("given a valid test, it should create a row in database", async () => {
    await agent.post("/tests").send(validTest).set("Authorization", JWTtoken);
    const result = await prisma.test.findFirst({where: {name: validTest.name}});
    expect(result).toHaveProperty("id");
    expect(result.pdfUrl).toEqual(validTest.pdfUrl);
    expect(result.categoryId).toEqual(validTest.categoryId);
  });

  it("given an invalid request body, it should return 422", async () => {
    const result = await agent.post("/tests").send(invalidRequestBody).set("Authorization", JWTtoken);
    expect(result.status).toEqual(422);
  });

  it("given an invalid request body, it shouldn't create a row in database", async () => {
    await agent.post("/tests").send(invalidRequestBody).set("Authorization", JWTtoken);
    const result = await prisma.test.findFirst({where: {name: invalidRequestBody.name}});
    expect(result).toBeNull();
  });

  it("given an unauthorized user, it should return 401", async () => {
    const result = await agent.post("/tests").send(validTest).set("Authorization", "Bearer 5454546");
    expect(result.status).toEqual(401);
  });

  it("given an unauthorized user, it shouldn't create a row in database", async () => {
    await agent.post("/tests").send(validTest).set("Authorization", "Bearer 5454546");
    const result = await prisma.test.findFirst({where: {name: validTest.name}});
    expect(result).toBeNull();
  });

  it("given an invalid teacher Id, it should return 404", async () => {
    const result = await agent.post("/tests").send({...validTest, teacherId: 9999999}).set("Authorization", JWTtoken);
    expect(result.status).toEqual(404);
  });

  it("given an invalid teacher Id, it shouldn't create a row in database", async () => {
    await agent.post("/tests").send({...validTest, teacherId: 9999999}).set("Authorization", JWTtoken);
    const result = await prisma.test.findFirst({where: {name: validTest.name}});
    expect(result).toBeNull();
  });

  it("given an invalid discipline Id, it should return 404", async () => {
    const result = await agent.post("/tests").send({...validTest, disciplineId: 9999999}).set("Authorization", JWTtoken);
    expect(result.status).toEqual(404);
  });

  it("given an invalid discipline Id, it shouldn't create a row in database", async () => {
    await agent.post("/tests").send({...validTest, disciplineId: 9999999}).set("Authorization", JWTtoken);
    const result = await prisma.test.findFirst({where: {name: validTest.name}});
    expect(result).toBeNull();
  });

  it("given an invalid category Id, it should return 404", async () => {
    const result = await agent.post("/tests").send({...validTest, categoryId: 9999999}).set("Authorization", JWTtoken);
    expect(result.status).toEqual(404);
  });

  it("given an invalid category Id, it shouldn't create a row in database", async () => {
    await agent.post("/tests").send({...validTest, categoryId: 9999999}).set("Authorization", JWTtoken);
    const result = await prisma.test.findFirst({where: {name: validTest.name}});
    expect(result).toBeNull();
  });

});

describe("", () => {

  it("", async () => {
  });

});

afterAll(async () => {
  await prisma.$disconnect();
});