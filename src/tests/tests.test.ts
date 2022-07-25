import supertest from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import app from "../../app.js";
import prisma from "../config/database.js";

const agent = supertest(app);

const validEmail = {email: "henrique@gmail.com", password: "1234"};

beforeAll(async () => {
  const password = "1234";
  const hash = bcrypt.hashSync(password, 11);

  await prisma.$executeRaw`
    INSERT INTO users ("email", "password") VALUES ('henrique@gmail.com', ${hash})

    INSERT INTO terms ("number") VALUES (1);
    INSERT INTO terms ("number") VALUES (2);
    INSERT INTO terms ("number") VALUES (3);
    INSERT INTO terms ("number") VALUES (4);
    INSERT INTO terms ("number") VALUES (5);
    INSERT INTO terms ("number") VALUES (6);
    
    INSERT INTO categories ("name") VALUES ('Projeto');
    INSERT INTO categories ("name") VALUES ('Prática');
    INSERT INTO categories ("name") VALUES ('Recuperação');
    
    INSERT INTO teachers ("name") VALUES ('Diego Pinho');
    INSERT INTO teachers ("name") VALUES ('Bruna Hamori');
    
    INSERT INTO disciplines ("name", "termId") VALUES ('HTML e CSS', 1);
    INSERT INTO disciplines ("name", "termId") VALUES ('JavaScript', 2);
    INSERT INTO disciplines ("name", "termId") VALUES ('React', 3);
    INSERT INTO disciplines ("name", "termId") VALUES ('Humildade', 1);
    INSERT INTO disciplines ("name", "termId") VALUES ('Planejamento', 2);
    INSERT INTO disciplines ("name", "termId") VALUES ('Autoconfiança', 3);
    
    INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 1);
    INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 2);
    INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 3); 
    INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 4);
    INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 5);
    INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 6);
  `;
});

beforeEach( async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe("POST /tests", () => {

  it("given a valid test, it should return 201", async () => {
  });

  it("given a valid test, it should create a row in database", async () => {
  });

  it("given an invalid request body, it should return 422", async () => {
  });

  it("given an invalid request body, it shouldn't create a row in database", async () => {
  });

  it("given an invalid request body, it should return 422", async () => {
  });

  it("given an invalid request body, it shouldn't create a row in database", async () => {
  });

  it("given an unauthorized user, it should return 401", async () => {
  });

  it("given an unauthorized user, it shouldn't create a row in database", async () => {
  });

  it("given an invalid teacher Id, it should return 404", async () => {
  });

  it("given an invalid teacher Id, it shouldn't create a row in database", async () => {
  });

  it("given an invalid discipline Id, it should return 404", async () => {
  });

  it("given an invalid discipline Id, it shouldn't create a row in database", async () => {
  });

  it("given an invalid category Id, it should return 404", async () => {
  });

  it("given an invalid category Id, it shouldn't create a row in database", async () => {
  });

});

describe("", () => {

  it("", async () => {
  });

});

afterAll(async () => {
  await prisma.$disconnect();
});