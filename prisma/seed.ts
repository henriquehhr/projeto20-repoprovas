import bcrypt from "bcrypt";

import prisma from "../src/config/database.js";

async function main(){
  console.log("iniciou o seed");
  const passwordAdmin = bcrypt.hashSync("adminadmin", 11);
  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      password: passwordAdmin
    }
  });

  const passwordUser = bcrypt.hashSync("useruseruser", 11);
  await prisma.user.upsert({
    where: { email: "user@gmail.com" },
    update: {},
    create: {
      email: "user@gmail.com",
      password: passwordUser
    }
  });

}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});